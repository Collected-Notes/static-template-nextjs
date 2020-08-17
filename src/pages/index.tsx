import { GetStaticProps } from "next";
import { collectedNotes } from "collected-notes";
import { HomePageProps } from "types";
import { HomeLayout } from "layouts/home";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const { site, notes } = await cn.site(process.env.CN_SITE_PATH);
  return { props: { site, notes }, revalidate: 1 };
};

export default HomeLayout;
