import { NextApiRequest, NextApiResponse } from "next";
import { collectedNotes } from "collected-notes";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export default async function sitemap(
    req: NextApiRequest,
    res: NextApiResponse<string | { message: string }>
) {

    const { site, notes } = await cn.site(
        process.env.CN_SITE_PATH,
        1,
        "public_site"
    );

    // fetch all pages
    if (notes.length < site.total_notes) {
        for await (let page of Array.from(
            { length: Math.ceil(site.total_notes / 40) },
            (_, index) => index + 1
        )) {
            if (page === 1) continue;

            const res = await cn.site(process.env.CN_SITE_PATH, page, "public_site");
            notes.push(...res.notes);
        }
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    if (process.env.SITEMAP_URL) {
        notes.forEach((note) => {
            xml += `<url><loc>${process.env.SITEMAP_URL}/${note.path}</loc><lastmod>${note.updated_at}</lastmod></url>`;
        });
    } else {
        notes.forEach((note) => {
            xml += `<url><loc>/${note.path}</loc><lastmod>${note.updated_at}</lastmod></url>`;
        });
    }

    xml += `</urlset>`;

    res.setHeader('Content-Type', 'text/xml')
    res.send(xml);
}
