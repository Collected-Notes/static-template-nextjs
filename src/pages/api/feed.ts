import { NextApiRequest, NextApiResponse } from "next";
import { collectedNotes } from "collected-notes";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);
const { FEED_HOME_PAGE_URL } = process.env;

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse<string | { message: string }>
) {
  if (!FEED_HOME_PAGE_URL) {
    return res.json({
      message: "Missing the FEED_HOME_PAGE_URL environment variable.",
    });
  }

  if (req.query.format === "json") {
    const feed = await cn.feed(
      process.env.CN_SITE_PATH,
      "public_site",
      {
        home_page_url: process.env.FEED_HOME_PAGE_URL,
        feed_url: new URL(
          "/feed/api?format=json",
          process.env.FEED_HOME_PAGE_URL
        ).toString(),
      },
      "json"
    );
    res.setHeader("Content-Type", "application/feed+json");
    return res.send(JSON.stringify(feed, null, 2));
  }

  const feed = await cn.feed(
    process.env.CN_SITE_PATH,
    "public_site",
    {
      home_page_url: process.env.FEED_HOME_PAGE_URL,
      feed_url: new URL(
        "/feed/api?format=xml",
        process.env.FEED_HOME_PAGE_URL
      ).toString(),
    },
    "xml"
  );

  res.setHeader("Content-Type", "application/rss+xml");
  res.send(feed);
}
