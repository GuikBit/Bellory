import { readdir, stat, unlink } from "node:fs/promises"
import { join, parse, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public")
const MIN_BYTES = 300 * 1024 // convert anything >= 300 KB
const WEBP_QUALITY = 82
const MAX_WIDTH = 1600 // downscale if wider than this (device pixels at 2x)

async function main() {
  const entries = await readdir(PUBLIC_DIR)
  const candidates = []

  for (const name of entries) {
    if (!/\.(png|jpe?g)$/i.test(name)) continue
    const full = join(PUBLIC_DIR, name)
    const s = await stat(full)
    if (s.size >= MIN_BYTES) candidates.push({ name, full, size: s.size })
  }

  if (candidates.length === 0) {
    console.log("nothing to optimize (no PNG/JPG >= 300 KB)")
    return
  }

  console.log(`${candidates.length} image(s) to convert:\n`)

  for (const { name, full, size } of candidates) {
    const { name: base } = parse(name)
    const webpPath = join(PUBLIC_DIR, `${base}.webp`)

    const img = sharp(full)
    const meta = await img.metadata()
    const resizeNeeded = meta.width && meta.width > MAX_WIDTH

    const pipeline = resizeNeeded ? img.resize({ width: MAX_WIDTH, withoutEnlargement: true }) : img
    await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webpPath)

    const newSize = (await stat(webpPath)).size
    const saved = size - newSize
    const pct = ((saved / size) * 100).toFixed(1)

    console.log(
      `  ${name} (${(size / 1024).toFixed(0)} KB)` +
        ` -> ${base}.webp (${(newSize / 1024).toFixed(0)} KB)` +
        ` | -${pct}%` +
        (resizeNeeded ? ` | resized to ${MAX_WIDTH}px` : "")
    )

    // Delete the original PNG/JPG after successful WebP conversion
    await unlink(full)
  }

  console.log("\ndone. originals removed; update code to reference the .webp files.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
