// Star catalog loader - runs in a Web Worker so the 119k-star decode never
// blocks the main thread. Fetches the binary catalog (see make_star_bin.py for
// the layout) plus the string metadata, dequantizes, precomputes the per-star
// GPU attributes (colors, twinkle phases), and transfers everything back as
// typed arrays. Zero JSON parsing for the numeric data, zero copies on return.

// B-V color index -> approximate RGB (same piecewise fit as astro.js bvToRgb)
function bvToRgb(bv) {
  const t = Math.max(-0.4, Math.min(2.0, bv));
  let r, g, b;
  if (t < 0.0)      { r = 0.61 + 0.11 * (t + 0.4) / 0.4 + 0.1; }
  else if (t < 0.4) { r = 0.83 + 0.17 * t / 0.4; }
  else              { r = 1.0; }
  if (t < 0.0)      { g = 0.70 + 0.07 * (t + 0.4) / 0.4 + 0.1; }
  else if (t < 0.4) { g = 0.87 + 0.11 * t / 0.4; }
  else if (t < 1.6) { g = 0.98 - 0.16 * (t - 0.4) / 1.2; }
  else              { g = 0.82 - 0.5 * (t - 1.6) / 0.4; }
  if (t < 0.4)      { b = 1.0; }
  else if (t < 1.5) { b = 1.0 - 0.47 * (t - 0.4) / 1.1; }
  else              { b = 0.63 - 0.6 * (t - 1.5) / 0.5; }
  return [Math.min(1, Math.max(0, r)), Math.min(1, Math.max(0, g)), Math.min(1, Math.max(0, b))];
}

onmessage = async (e) => {
  try {
    const { bin, meta } = e.data;
    const [buf, metaJson] = await Promise.all([
      fetch(bin).then((r) => { if (!r.ok) throw new Error('stars.bin HTTP ' + r.status); return r.arrayBuffer(); }),
      fetch(meta).then((r) => { if (!r.ok) throw new Error('stars_meta HTTP ' + r.status); return r.json(); }),
    ]);

    const head = new DataView(buf, 0, 16);
    if (head.getUint32(0, true) !== 0x52545355) throw new Error('bad magic');   // 'USTR' LE
    if (head.getUint32(4, true) !== 1) throw new Error('unknown version');
    const N = head.getUint32(8, true);
    const nInfo = head.getUint32(12, true);

    let off = 16;
    const dirs = new Float32Array(buf, off, N * 3); off += N * 12;
    const mag100 = new Int16Array(buf, off, N); off += N * 2;
    const ci100 = new Int16Array(buf, off, N); off += N * 2;
    const dist = new Float32Array(buf, off, N); off += N * 4;
    const hip = new Uint32Array(buf, off, N); off += N * 4;
    const hd = new Uint32Array(buf, off, N); off += N * 4;
    const con = new Uint8Array(buf, off, nInfo);

    // dequantize + precompute the GPU attribute arrays
    const mag = new Float32Array(N);
    const ci = new Float32Array(N);
    const cols = new Float32Array(N * 3);
    const tw = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      mag[i] = mag100[i] / 100;
      ci[i] = ci100[i] / 100;
      const [r, g, b] = bvToRgb(ci[i]);
      cols[i * 3] = r; cols[i * 3 + 1] = g; cols[i * 3 + 2] = b;
      tw[i] = Math.random();
    }

    postMessage(
      { N, nInfo, dirs, mag, ci, dist, hip, hd, con, cols, tw,
        names: metaJson.names, desig: metaJson.desig, spect: metaJson.spect,
        conCodes: metaJson.conCodes },
      [buf, mag.buffer, ci.buffer, cols.buffer, tw.buffer],
    );
  } catch (err) {
    postMessage({ error: String(err && err.message || err) });
  }
};
