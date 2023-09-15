import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Returns the absolute path from relative path (based on main file)
 * @param {string} relativePath
 * @returns {string} absulte path
 */
export function getAbsolutePath(relativePath) {
  return path.join(__dirname, relativePath);
}

/**
 * Get SVG path for Heroicons icon
 * @param {string} name icon name
 * @returns {Promise<string>} 
 */
export async function getIcon(name) {
  const iconUrl = `https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/20/solid/${name}.svg`;
  const iconSvg = (await axios.get(iconUrl)).data;
  const iconSvgPath = iconSvg.split("\n")[1].split('/>')[0] + ` stroke="url(#paint1_linear_0_1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="matrix(25 0 0 25 25 0) translate(24, 2)" />`;

  return iconSvgPath;
}

/**
 * Uppercase first letter
 * @param {string} text
 * @returns {string}
 */
export async function uppercaseFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}