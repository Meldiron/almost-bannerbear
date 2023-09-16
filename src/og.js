import { Resvg } from "@resvg/resvg-js";
import { getAbsolutePath } from "./utils.js";

/**
 * Generates SVG of OG image based on configuratiion
 * @param {bool} isDark If theme is dark. Defines background color and glow effect
 * @param {string} brandColor Hex color of foreground
 * @param {string} brandName Company name
 * @param {string} title OG image title
 * @param {string} subtitle OG image subtitle
 * @param {string} iconSvgPath <path> element of SVG icon
 * @returns {string} Generated SVG of OG image
 */
export function generateSvg(
  isDark,
  brandColor,
  brandName,
  title,
  subtitle,
  iconSvgPath,
) {
  const themeColor = isDark ? "#030304" : "#f9fafb";

  return `
      <svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <rect width="1200" height="630" fill="${themeColor}" />
        <g clip-path="url(#clip0_0_1)">
          <rect width="1200" height="630" fill="${themeColor}" />
          <circle opacity="0.4" cx="1163" r="590" fill="url(#paint0_radial_0_1)" />
          ${iconSvgPath}
          
          <text fill="${brandColor}" xml:space="preserve" style="white-space: pre" font-size="24" font-weight="600" letter-spacing="0.025em">
            <tspan x="70" y="450">${subtitle}</tspan>
          </text>
  
          <text fill="white" xml:space="preserve" style="white-space: pre" font-size="72" font-weight="bold" letter-spacing="0.025em">
            <tspan x="70" y="544.688">${title}</tspan>
          </text>
  
          <text fill="url(#paint2_linear_3_2)" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="72" font-weight="bold" letter-spacing="0.025em"><tspan x="70" y="139.682">${brandName.toUpperCase()}</tspan></text>
        </g>
        <defs>
          <style type="text/css">
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600;700');
          </style>
          <radialGradient id="paint0_radial_0_1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1163) rotate(90) scale(590)">
            <stop stop-color="${brandColor}" />
            <stop offset="0.703125" stop-color="${brandColor}" stop-opacity="0" />
            <stop offset="1" stop-color="${brandColor}" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="paint1_linear_0_1" x1="0" y1="0" x2="0" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${brandColor}" stop-opacity="0.2"/>
            <stop offset="0.3" stop-color="${brandColor}" stop-opacity="0.5"/>
            <stop offset="0.45" stop-color="${brandColor}"  stop-opacity="0.85" />
            <stop offset="0.55" stop-color="${brandColor}"  stop-opacity="0.85" />
            <stop offset="0.7" stop-color="${brandColor}" stop-opacity="0.5"/>
            <stop offset="1" stop-color="${brandColor}" stop-opacity="0.2"/>
          </linearGradient>
          <linearGradient id="paint2_linear_3_2" x1="267" y1="70" x2="267" y2="157" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="${brandColor}" stop-opacity="0.2"/>
            <stop offset="0.3" stop-color="${brandColor}" stop-opacity="0.5"/>
            <stop offset="0.45" stop-color="${brandColor}"  stop-opacity="0.85" />
            <stop offset="0.55" stop-color="${brandColor}"  stop-opacity="0.85" />
            <stop offset="0.7" stop-color="${brandColor}" stop-opacity="0.5"/>
            <stop offset="1" stop-color="${brandColor}" stop-opacity="0.2"/>
          </linearGradient>
          <clipPath id="clip0_0_1">
            <rect width="1200" height="630" fill="${themeColor}" />
          </clipPath>
        </defs>
      </svg>
    `;
}

/**
 * Converts SVG to PNG
 * @param {string} svg SVG string to render
 * @returns {Buffer} PNG Buffer
 */
export function renderPng(svg) {
  const resvg = new Resvg(svg, {
    background: "rgba(0,0,0,1)",
    fitTo: {
      mode: "width",
      value: 1200,
    },
    font: {
      fontFiles: [
        getAbsolutePath("../fonts/Nunito-Bold.ttf"),
        getAbsolutePath("../fonts/Nunito-SemiBold.ttf"),
      ],
      loadSystemFonts: true,
      defaultFontFamily: "Nunito",
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}
