import { FieldId } from "@models/Board/Board";
import { Othello, OthelloValues } from "@models/Game/Othello";
import { othelloReducer } from "@models/Game/othelloReducer";
import { atom } from "jotai";

const initial = Othello.initialize().values();

// 意図しない変更を防ぐため、primitive atomは非公開にしておく
const othelloAtom = atom<OthelloValues>(initial);

// 公開用 read/write atom
export const othelloSelector = atom((get) => get(othelloAtom));
export const othelloUpdater = atom(null, (get, set, fieldId: FieldId) => {
  const current = Othello.reconstruct(get(othelloAtom));
  set(
    othelloAtom,
    othelloReducer(current, { type: "update", fieldId }).values()
  );
});
export const othelloSkipper = atom(null, (get, set) => {
  const current = Othello.reconstruct(get(othelloAtom));
  set(othelloAtom, othelloReducer(current, { type: "skip" }).values());
});
