import * as React from "react";
import Link from "next/link";
import styles from "components/header.module.css";

export function Header({ name, headline }: { name: string; headline: string }) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <h1>{name}</h1>
        </a>
      </Link>
      <p>{headline}</p>
    </header>
  );
}
