import * as React from "react";
import useSWR from "swr";
import { Note } from "collected-notes";
import { format } from "url";

async function search(_: string, term: string, page: number): Promise<Note[]> {
  const url = format({
    pathname: "/api/search",
    query: { term, page },
  });
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
}

export function useSearch(value: string, page: number = 1, debounce = 300) {
  const [term, setTerm] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(setTerm, debounce, value);
    return () => clearTimeout(timer);
  }, [setTerm, value, debounce]);

  return useSWR(() => (term ? ["search", term, page] : null), search);
}
