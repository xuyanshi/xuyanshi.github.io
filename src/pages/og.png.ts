import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";
import { createOgCard, ogSatoriOptions } from "@/utils/ogTemplate";
import config from "@/config";

export const GET: APIRoute = async context => {
  const fonts = fontData["--font-google-sans-code"];
  const regularFontPath = fonts ? getFontPathByWeight(fonts, 400) : undefined;
  const boldFontPath = fonts ? getFontPathByWeight(fonts, 700) : undefined;

  // If fonts aren't available (e.g. CI without network), return fallback
  if (regularFontPath === undefined || boldFontPath === undefined) {
    const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <rect width="1200" height="630" fill="#fefbfb"/>
      <text x="600" y="280" text-anchor="middle" font-size="72" font-weight="bold" fill="#000">${config.site.title}</text>
      <text x="600" y="350" text-anchor="middle" font-size="28" fill="#666">${config.site.description}</text>
    </svg>`;
    const pngBuffer = await sharp(Buffer.from(fallbackSvg)).png().toBuffer();
    return new Response(new Uint8Array(pngBuffer), {
      headers: { "Content-Type": "image/png" },
    });
  }

  const [regularData, boldData] = await Promise.all([
    fetch(experimental_getFontFileURL(regularFontPath, context.url)).then(res =>
      res.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(boldFontPath, context.url)).then(res =>
      res.arrayBuffer()
    ),
  ]);

  const svg = await satori(
    createOgCard([
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "90%",
            maxHeight: "90%",
            overflow: "hidden",
            textAlign: "center",
          },
          children: [
            {
              type: "p",
              props: {
                style: { fontSize: 72, fontWeight: "bold" },
                children: config.site.title,
              },
            },
            {
              type: "p",
              props: {
                style: { fontSize: 28 },
                children: config.site.description,
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginBottom: "8px",
            fontSize: 28,
          },
          children: {
            type: "span",
            props: {
              style: { overflow: "hidden", fontWeight: "bold" },
              children: new URL(config.site.url).hostname,
            },
          },
        },
      },
    ]) as any,
    {
      ...ogSatoriOptions,
      fonts: [
        {
          name: "Google Sans Code",
          data: regularData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Google Sans Code",
          data: boldData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
