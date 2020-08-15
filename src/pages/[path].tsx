import { GetStaticProps, GetStaticPaths } from "next";
import { collectedNotes } from "collected-notes";
import { ArticlePageProps, ArticlePageQuery } from "types";
import { ArticleLayout } from "layouts/article";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  ArticlePageQuery
> = async ({ params }) => {
  const [{ site }, note] = await Promise.all([
    cn.site(process.env.CN_SITE_PATH),
    cn.read(process.env.CN_SITE_PATH, params.path),
  ]);
  const [links, { body }] = await Promise.all([
    cn.links(site.id, note.id, "json"),
    cn.body(site.id, note.id),
  ]);
  return { props: { note, site, body, links } };
};

export const getStaticPaths: GetStaticPaths<ArticlePageQuery> = async () => {
  const notes = await cn.latestNotes(Number(process.env.CN_SITE_ID));
  return {
    paths: notes
      .filter((note) => note.visibility === "public")
      .map((note) => ({ params: { path: note.path } })),
    fallback: false,
  };
};

export default ArticleLayout;
