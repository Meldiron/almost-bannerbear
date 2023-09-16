import {
  getIcon,
  uppercaseFirst,
  getStaticFile,
  interpolate,
} from "./utils.js";
import { generateSvg, renderPng } from "./og.js";

export default async ({ req, res, log }) => {
  // Endpoint with form for OG image URL generation
  if (req.path === "/") {
    const html = interpolate(getStaticFile("index.html"), {
      HOSTNAME: req.host,
    });
    return res.send(html, 200, { "Content-Type": "text/html; charset=utf-8" });
  }

  // Endpoint to render OG image
  if (req.path === "/image.png") {
    // Extract input from request
    const theme = process.env.THEME ?? "dark";
    const brandColor = process.env.BRAND_COLOR ?? "#f02e65";
    const brandName = process.env.BRAND_NAME ?? "Website";

    const url = decodeURIComponent(req.query.url ?? "/template");
    const title = decodeURIComponent(req.query.title ?? "Hello World");
    const icon = decodeURIComponent(req.query.icon ?? "globe-alt");

    // Prepare before render
    const isDark = theme === "dark";
    const iconSvgPath = await getIcon(icon);
    const urlText = ["home", ...url.split("/").filter((part) => part !== "")]
      .map((part) => uppercaseFirst(part))
      .join("   /   ");

    // Render OG image
    const svg = generateSvg(
      isDark,
      brandColor,
      brandName,
      title,
      urlText,
      iconSvgPath,
    );
    const png = renderPng(svg);

    // Return OG image
    log(svg);
    return res.send(png, 200, {
      "Content-Type": "image/png",
    });
  }

  // Redirect to frontend instead of 404
  return res.redirect("/");
};
