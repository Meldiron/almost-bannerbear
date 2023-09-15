import { Resvg } from "@resvg/resvg-js";
import { getAbsolutePath, getIcon } from './utils';

export default async ({ req, res, log, error }) => {
  // Endpoint to render OG image
  if(req.path === '/image.png') {

    // Extract input from request
    const theme = process.env.THEME ?? 'dark';
    const brandColor = process.env.BRAND_COLOR ?? '#f02e65';

    const url = decodeURIComponent(req.query.url ?? '');
    const title = decodeURIComponent(req.query.title ?? 'Website');
    const icon = decodeURIComponent(req.query.icon ?? 'globe-alt');

    // Preparation before render
    const iconSvgPath = await getIcon(icon);
    const themeColor = theme === 'dark' ? '#030304' : '#f9fafb';
    const urlText = ['home', ...url.split('/').filter((part) => part !== '')].map((part) => uppercaseFirst(part)).join('   /   ');

    // Generate SVG
    const svg = `
      <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="1200" height="630" fill="${themeColor}" />
        <g clip-path="url(#clip0_0_1)">
          <rect width="1200" height="630" fill="${themeColor}" />
          <circle opacity="0.4" cx="1163" r="590" fill="url(#paint0_radial_0_1)" />
          ${iconSvgPath}
          
          <text fill="${brandColor}" xml:space="preserve" style="white-space: pre" font-size="24" font-weight="600" letter-spacing="0.025em">
            <tspan x="70" y="450">${urlText}</tspan>
          </text>

          <text fill="white" xml:space="preserve" style="white-space: pre" font-size="72" font-weight="bold" letter-spacing="0.025em">
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

    // Convert SVG to PNG
    const resvg = new Resvg(svg, {
      background: 'rgba(0,0,0,1)',
      fitTo: {
        mode: 'width',
        value: 1200,
      },
      font: {
        fontFiles: [ getAbsolutePath('../fonts/Nunito-Bold.ttf'), getAbsolutePath('../fonts/Nunito-SemiBold.ttf') ],
        loadSystemFonts: true,
        defaultFontFamily: 'Nunito',
      }
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Return PNG OG image
    return res.send(pngBuffer, 200, {
      'Content-Type': 'image/png',
    });
  }

  // 404 page
  return res.send("Use path /image.png");
};
