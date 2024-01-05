import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "components/header.module.css";

export function Header({ name, headline }: { name: string; headline: string }) {
  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content={headline} />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <h1>{name}</h1>
        </Link>
        <p>{headline}</p>
      </header>
    </>
  );
}
