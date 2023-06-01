import { Trash, TrashProps } from "@src/entities/trash";

type Override = Partial<TrashProps>;

export function MakeTrash(overrides: Override = {}) {
  return new Trash(
    {
      title: "title",
      content: "content",
      date: "02/23/2024",
      done: true,
      createdAt: new Date("02/23/2023"),
      ...overrides,
    },
    "6f1da3d96ccf4e6b8332da98"
  );
}