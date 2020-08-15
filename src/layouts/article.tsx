import * as React from "react";
import { parse } from "url";
import clsx from "clsx";
import NextLink from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArticlePageProps } from "types";
import { Header } from "components/header";
import styles from "layouts/article.module.css";

export function ArticleLayout({ note, site, body, links }: ArticlePageProps) {
  return (
    <>
      <Header name={site.name} headline={site.headline} />

      <article
        className={clsx(styles.article, "prose")}
        dangerouslySetInnerHTML={{ __html: body }}
      />

      <footer className={styles.footer}>
        <time dateTime={note.created_at}>
          {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
        </time>

        <p>
          <NextLink href="/">
            <a>{site.name}</a>
          </NextLink>
        </p>
      </footer>

      <aside className={styles.aside}>
        <p>Links on this note↗</p>

        <ul>
          {links.map((link) => {
            const isInternal = link.kind === "internal";
            return (
              <li className={clsx({ [styles.internal]: isInternal })}>
                <a href={link.url}>{link.host}</a>
                <span>{parse(link.url).pathname}</span>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
