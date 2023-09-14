import satori from 'satori';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async ({ req, res, log, error }) => {
    if(req.path === 'image') {
    const fontSemibold = await fs.readFile(path.join(__dirname, '../fonts/Nunito-SemiBold.ttf'));
    const fontBold = await fs.readFile(path.join(__dirname, '../fonts/Nunito-Bold.ttf'));

    const svg = await satori(
      {
        type: 'div',
        props: {
          children: 'hello, world',
          style: { backgroundColor: 'black', color: 'white', width: '100vw', height: '100vh' },
        },
      },
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Nunito',
            data: fontSemibold,
            weight: 600,
            style: 'normal',
          },
          {
            name: 'Nunito',
            data: fontBold,
            weight: 700,
            style: 'normal',
          },
        ],
      },
    );

    return res.send(svg, 200, {
      'Content-Type': 'image/svg+xml',
    });
  }

  return res.send("Use path /image");
};
