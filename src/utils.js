import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolder = path.join(__dirname, "../static");

/**
 * Returns the absolute path from relative path
 * @param {string} relativePath path relative to main file
 * @returns {string} absulte path
 */
export function getAbsolutePath(relativePath) {
  return path.join(__dirname, relativePath);
}

/**
 * Returns the contents of a file
 * @param {string} fileName relative path to static folder
 * @returns {string} Contents of static/{fileName}
 */
export function getStaticFile(fileName) {
  return fs.readFileSync(path.join(staticFolder, fileName)).toString();
}

/**
 * Interpolate string with dynamic values
 * @param {string} template String with placeholders
 * @param {Record<string, string | undefined>} values Values to interpolate
 * @returns {string} Interpolated string
 */
export function interpolate(template, values) {
  return template.replace(/{{([^}]+)}}/g, (_, key) => values[key] || "");
}

/**
 * Get SVG path for Heroicons icon
 * @param {string} name icon name
 * @returns {Promise<string>} <path> element of the icon
 */
export async function getIcon(name) {
  const iconUrl = `https://raw.githubusercontent.com/tailwindlabs/heroicons/master/optimized/24/outline/${name}.svg`;
  const iconSvg = (await axios.get(iconUrl)).data;

  const paths = iconSvg.split("\n").filter((line) => line.includes("<path"));

  const pathsDesigned = paths.map((path) => {
    const pathUnfinished = path.split("/>")[0];
    const pathImprovements = [];

    if (!pathUnfinished.includes("stroke=")) {
      pathImprovements.push('stroke="url(#paint1_linear_0_1)"');
    }

    if (!pathUnfinished.includes("stroke-linejoin=")) {
      pathImprovements.push('stroke-linejoin="round"');
    }

    if (!pathUnfinished.includes("stroke-linecap=")) {
      pathImprovements.push('stroke-linecap="round"');
    }

    if (!pathUnfinished.includes("stroke-width=")) {
      pathImprovements.push('stroke-width="1"');
    }

    if (!pathUnfinished.includes("transform=")) {
      pathImprovements.push(
        'transform="matrix(25 0 0 25 25 0) translate(22, 0)"',
      );
    }

    return pathUnfinished + " " + pathImprovements.join(" ") + " />";
  });

  return pathsDesigned.join("\n");
}

/**
 * Uppercase first letter
 * @param {string} text Text to uppercase
 * @returns {string} Uppercased text
 */
export function uppercaseFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
