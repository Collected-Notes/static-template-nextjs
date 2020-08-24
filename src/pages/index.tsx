import { GetStaticProps } from "next";
import { collectedNotes } from "collected-notes";
import { HomePageProps } from "types";
import { HomeLayout } from "layouts/home";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
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

  return { props: { site, notes }, revalidate: 1 };
};

export default HomeLayout;
