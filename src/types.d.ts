import { Note, Site, Link, HTML } from "collected-notes";

export type ArticlePageProps = {
  note: Note;
  site: Site;
  body: HTML;
  links: Link[];
};

export type ArticlePageQuery = { path: string[] };

export type HomePageProps = { site: Site; notes: Note[] };

export type SearchPageProps = { site: Site; }
