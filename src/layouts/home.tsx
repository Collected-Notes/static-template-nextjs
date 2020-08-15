import * as React from "react";
import { HomePageProps } from "types";
import { Header } from "components/header";
import styles from "layouts/home.module.css";
import { NoteItem } from "components/note-item";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

export function HomeLayout({ site, notes }: HomePageProps) {
  return (
    <>
      <Header name={site.name} headline={site.headline} />

      <nav className={styles.nav}>
        <Link href="/search">
          <a>
            <FaSearch /> <span>Search</span>
          </a>
        </Link>
      </nav>

      <section className={styles.section}>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </section>
    </>
  );
}
