import { GetStaticProps, GetStaticPaths } from "next";
import { collectedNotes } from "collected-notes";
import { ArticlePageProps, ArticlePageQuery } from "types";
import { ArticleLayout } from "layouts/article";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  ArticlePageQuery
> = async ({ params }) => {
  const [{ site }, { note, body }, links] = await Promise.all([
    cn.site(process.env.CN_SITE_PATH, 1, "public_site"),
    cn.body(process.env.CN_SITE_PATH, params.path.join("/")),
    cn.links(process.env.CN_SITE_PATH, params.path.join("/"), "json"),
  ]);
  return { props: { note, site, body, links }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths<ArticlePageQuery> = async () => {
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

  return {
    paths: notes.map((note) => ({ params: { path: note.path.split("/") } })),
    fallback: true,
  };
};

export default ArticleLayout;
