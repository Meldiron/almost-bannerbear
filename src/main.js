import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from "@resvg/resvg-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cache = null;
const getCache = async () => {
  if(!cache) {
    const config = JSON.parse((await fs.readFile(path.join(__dirname, '../static/config.json'))).toString());
    const { theme, brandColor, icon } = config;
    const iconUrl = `https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/20/solid/${icon}.svg`;
    const iconSvg = (await axios.get(iconUrl)).data;
    const iconSvgPath = iconSvg.split("\n")[1].split('/>')[0] + ` stroke="url(#paint1_linear_0_1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="matrix(25 0 0 25 25 0) translate(24, 2)" />`;

    cache = { theme, brandColor, icon, iconSvgPath };
  }

  return cache;
};

export default async ({ req, res, log, error }) => {

  const { logoBase64, theme, brandColor, iconSvgPath } = await getCache();

  const url = decodeURIComponent(req.query.url);
  const title = decodeURIComponent(req.query.title);

  const themeColor = theme === 'dark' ? '#030304' : '#f9fafb';
  const urlParts = url.split('/').filter((part) => part !== '');
  urlParts.unshift('home');
  const urlText = urlParts.map((part) => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('   /   ');

  if(req.path === '/image.png') {
    const svg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="1200" height="630" fill="${themeColor}" />
        <g clip-path="url(#clip0_0_1)">
          <rect width="1200" height="630" fill="${themeColor}" />
          <circle opacity="0.4" cx="1163" r="590" fill="url(#paint0_radial_0_1)" />
          ${iconSvgPath}
          
          <text fill="${brandColor}" font-family="serif" font-size="24" font-weight="600" letter-spacing="0.025em">
            <tspan x="70" y="450">${urlText}</tspan>
          </text>

          <text fill="white" font-family="serif" font-size="72" font-weight="bold" letter-spacing="0.025em">
            <tspan x="70" y="544.688">${title}</tspan>
          </text>
        </g>
        <defs>
          <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700');
          </style>
          <radialGradient id="paint0_radial_0_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1163) rotate(90) scale(590)">
            <stop stop-color="#F02E65" />
            <stop offset="0.703125" stop-color="#F02E65" stop-opacity="0" />
            <stop offset="1" stop-color="#F02E65" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="paint1_linear_0_1" x1="0" y1="0" x2="0" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#F02E65" stop-opacity="0.1" />
            <stop offset="0.5" stop-color="#F02E65" stop-opacity="0.4" />
            <stop offset="0.6" stop-color="#F02E65" stop-opacity="0.7" />
            <stop offset="0.7" stop-color="#F02E65" stop-opacity="0.4" />
            <stop offset="1" stop-color="#F02E65" stop-opacity="0.1" />
          </linearGradient>
          <clipPath id="clip0_0_1">
            <rect width="1200" height="630" fill="${themeColor}" />
          </clipPath>
        </defs>
      </svg>
    `;

    const opts = {
      background: 'rgba(0,0,0,1)',
      fitTo: {
        mode: 'width',
        value: 1200,
      },
      font: {
        loadSystemFonts: true
      }
    };

    log(svg);

    const resvg = new Resvg(svg, opts);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return res.send(pngBuffer, 200, {
      'Content-Type': 'image/png',
    });
  }

  return res.send("Use path /image.png"); // 404
};
