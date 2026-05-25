import sharp from "sharp";
import pngToIco from "png-to-ico";
import fs from "fs/promises";

const svg = "public/favicon-1.svg";
const sizes = [16, 32, 48, 64, 128, 256];

await fs.mkdir("public/favicon", { recursive: true });

const pngFiles = [];

for (const size of sizes) {
  const file = `public/favicon/favicon-${size}.png`;

  await sharp(svg)
    .resize(size, size)
    .png()
    .toFile(file);

  pngFiles.push(file);
}

const ico = await pngToIco(pngFiles);
await fs.writeFile("public/favicon.ico", ico);

console.log("Created public/favicon.ico");