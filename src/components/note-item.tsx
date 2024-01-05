import { Note } from "collected-notes";
import Link from "next/link";
import styles from "components/note-item.module.css";

export function NoteItem({ note }: { note: Note }) {
  return (
    <Link href="[...path]" as={`/${note.path}`}>
      <article className={styles.note}>
        <h2>{note.title}</h2>
        <p>{note.headline}</p>
      </article>
    </Link>
  );
}
