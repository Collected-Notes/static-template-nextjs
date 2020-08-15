import { GetStaticProps } from "next";
import { collectedNotes } from "collected-notes";
import { SearchPageProps } from "types";
import { SearchLayout } from "layouts/search";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
  const { site, notes } = await cn.site(process.env.CN_SITE_PATH);
  return { props: { site, notes } };
};

export default SearchLayout;
