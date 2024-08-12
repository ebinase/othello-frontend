import { atom } from "jotai";

const messageAtom = atom<string>("");

export const messageSelector = atom((get) => get(messageAtom));

export const messageUpdateExecutor = atom(null, (get, set, message: string) => {
  set(messageAtom, message);
});
