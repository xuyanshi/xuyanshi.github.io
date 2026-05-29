import type { APIRoute } from "astro";
import { getEnrichedPosts } from "@/utils/getEnrichedPosts";
import { fontData, experimental_getFontFileURL } from "astro:assets";
import satori from "satori";
import sharp from "sharp";
import { getFontPathByWeight } from "@/utils/getFontPathByWeight";
import { getPostSlug } from "@/utils/getPostPaths";
import { createOgCard, ogSatoriOptions } from "@/utils/ogTemplate";
import config from "@/config";

export async function getStaticPaths() {
  if (!config.features.dynamicOgImage) {
    return [];
  }

  const posts = await getEnrichedPosts().then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return posts.map(post => ({
    params: { slug: getPostSlug(post.id, post.filePath) },
    props: post,
  }));
}

export const GET: APIRoute = async ({ props, url }) => {
  if (!config.features.dynamicOgImage) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }

  const fonts = fontData["--font-google-sans-code"];
  const regularFontPath = getFontPathByWeight(fonts, 400);
  const boldFontPath = getFontPathByWeight(fonts, 700);

  if (regularFontPath === undefined || boldFontPath === undefined) {
    throw new Error("Cannot find the font path.");
  }

  const [regularData, boldData] = await Promise.all([
    fetch(experimental_getFontFileURL(regularFontPath, url)).then(res =>
      res.arrayBuffer()
    ),
    fetch(experimental_getFontFileURL(boldFontPath, url)).then(res =>
      res.arrayBuffer()
    ),
  ]);

  const svg = await satori(
    createOgCard([
      {
        type: "p",
        props: {
          style: {
            fontSize: 72,
            fontWeight: "bold",
            maxHeight: "84%",
            overflow: "hidden",
          },
          children: props.data.title,
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "8px",
            fontSize: 28,
          },
          children: [
            {
              type: "span",
              props: {
                children: [
                  "by ",
                  {
                    type: "span",
                    props: {
                      style: { overflow: "hidden", fontWeight: "bold" },
                      children: "Yanshi XU",
                    },
                  },
                ],
              },
            },
            {
              type: "span",
              props: {
                style: { overflow: "hidden", fontWeight: "bold" },
                children: config.site.title,
              },
            },
          ],
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
