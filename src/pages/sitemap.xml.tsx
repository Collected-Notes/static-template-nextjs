import { GetServerSideProps } from 'next'
import { collectedNotes } from "collected-notes";

import React from 'react'

const Sitemap: React.FC = () => null

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    if (res) {
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

        res.setHeader('Content-Type', 'text/xml')
        res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);

        notes.forEach((note) => {
            if(process.env.SITEMAP_URL) {
                res.write(`<url><loc>${process.env.SITEMAP_URL}/${note.path}</loc><lastmod>${note.updated_at}</lastmod></url>`);
            }
            else {
                res.write(`<url><loc>/${note.path}</loc><lastmod>${note.updated_at}</lastmod></url>`);
            }
        });

        res.write(`</urlset>`);
        
        res.end();
    }
    return {
        props: {},
    }
}

export default Sitemap