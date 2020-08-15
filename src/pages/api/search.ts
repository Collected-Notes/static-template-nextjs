import { NextApiRequest, NextApiResponse } from "next";
import { collectedNotes, Note } from "collected-notes";

const cn = collectedNotes(process.env.CN_EMAIL, process.env.CN_TOKEN);

function unwrap<T>(value: T | T[]): T {
  return Array.isArray(value) ? value[0] : value;
}

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse<Note[]>
) {
  const { term, page = 1 } = req.query;
  const notes = await cn.search(
    Number(process.env.CN_SITE_ID),
    unwrap(term),
    unwrap((page as unknown) as number)
  );
  res.json(notes.filter((note) => note.visibility === "public"));
}
