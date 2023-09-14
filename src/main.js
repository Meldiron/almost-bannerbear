import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async ({ req, res, log, error }) => {
  const config = JSON.parse((await fs.readFile(path.join(__dirname, '../static/config.json'))).toString());

  const { theme, brandColor, logoPath } = config;
  const url = '/company/careers';
  const title = "We are hiring!"

  const logoBase64 = fs.readFile(path.join(__dirname, '../static/', logoPath), {
    encoding: 'base64',
  });

  const themeColor = theme === 'dark' ? '#030304' : '#f9fafb';
  const urlParts = url.split('/').filter((part) => part !== '');
  urlParts.unshift('home');

  if(req.path === '/image') {
    const svg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="1200" height="630" fill="${themeColor}" />
        <g clip-path="url(#clip0_0_1)">
          <rect width="1200" height="630" fill="${themeColor}" />
          <circle opacity="0.4" cx="1163" r="590" fill="url(#paint0_radial_0_1)" />
          <path d="M852.947 423.643C835.517 422.121 817.835 421.36 800 421.36H781C750.765 421.36 721.769 409.336 700.39 387.933C679.011 366.53 667 337.502 667 307.233C667 276.965 679.011 247.936 700.39 226.533C721.769 205.13 750.765 193.106 781 193.106H800C817.835 193.106 835.517 192.345 852.947 190.823M852.947 423.643C859.356 448.041 867.741 471.627 877.9 494.224C884.157 508.173 879.42 524.912 866.171 532.546L849.527 542.183C835.568 550.248 817.607 545.15 810.843 530.491C794.789 495.722 782.557 459.309 774.363 421.893M852.947 423.643C842.99 385.644 837.967 346.518 838 307.233C838 267.01 843.193 228.004 852.947 190.823M852.947 423.643C931.012 430.341 1007.03 452.177 1076.77 487.935M852.947 190.823C931.012 184.126 1007.03 162.29 1076.77 126.532M1076.77 487.935C1073.78 497.572 1070.56 507.057 1067.14 516.467M1076.77 487.935C1090.55 443.465 1099.17 397.553 1102.45 351.109M1076.77 126.532C1073.8 116.942 1070.59 107.429 1067.14 98M1076.77 126.532C1090.55 171.002 1099.17 216.913 1102.45 263.358M1102.45 263.358C1114.99 273.832 1123 289.607 1123 307.233C1123 324.86 1114.99 340.634 1102.45 351.109M1102.45 263.358C1104.53 292.571 1104.53 321.895 1102.45 351.109" stroke="url(#paint1_linear_0_1)" stroke-width="25" stroke-linecap="round" stroke-linejoin="round" />
          
          <text fill="${brandColor}" xml:space="preserve" style="white-space: pre" font-family="Nunito" font-size="24" font-weight="600" letter-spacing="0.025em">
            <tspan x="70" y="461.396">${urlParts.join(" / ")}</tspan>
          </text>

          <rect x="70" y="70" width="237.606" height="70" fill="url(#pattern0)" />
          <text fill="white" xml:space="preserve" style="white-space: pre" font-family="Nunito" font-size="72" font-weight="bold" letter-spacing="0.025em">
            <tspan x="70" y="544.688">${title}</tspan>
          </text>
        </g>
        <defs>
          <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700');
          </style>
          <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_0_1" transform="matrix(0.000391243 0 0 0.00132802 -0.000790745 0)" />
          </pattern>
          <radialGradient id="paint0_radial_0_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1163) rotate(90) scale(590)">
            <stop stop-color="#F02E65" />
            <stop offset="0.703125" stop-color="#F02E65" stop-opacity="0" />
            <stop offset="1" stop-color="#F02E65" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="paint1_linear_0_1" x1="895" y1="98" x2="895" y2="546" gradientUnits="userSpaceOnUse">
            <stop offset="0.114583" stop-color="#F02E65" stop-opacity="0.1" />
            <stop offset="0.328125" stop-color="#F02E65" stop-opacity="0.4" />
            <stop offset="0.447917" stop-color="#F02E65" stop-opacity="0.7" />
            <stop offset="0.572917" stop-color="#F02E65" stop-opacity="0.49" />
            <stop offset="1" stop-color="#F02E65" stop-opacity="0.3" />
          </linearGradient>
          <clipPath id="clip0_0_1">
            <rect width="1200" height="630" fill="${themeColor}" />
          </clipPath>
          <image id="image0_0_1" width="2560" height="753" xlink:href="data:image/png;${logoBase64}" />
        </defs>
      </svg>
    `;

    return res.send(svg, 200, {
      'Content-Type': 'image/svg+xml',
    });
  }

  return res.send("Use path /image");
};
