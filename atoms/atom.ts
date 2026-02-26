import { atom } from "jotai";

export type Notes = {
  id: number;
  title: string;
  content: string;
};

export const TodoAtom = atom([
  {
    id: 1,
    title: "Task 1",
    content: "Content 1",
  },
  {
    id: 2,
    title: "Task 2",
    content: "Content 2",
  },
  {
    id: 3,
    title: "Task 3",
    content: "Content 3",
  },
]);

export const isContainerGridAtom = atom(false);
