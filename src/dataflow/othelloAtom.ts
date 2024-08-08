import { FieldId } from "@models/Board/Board";
import { Othello, OthelloValues } from "@models/Game/Othello";
import { othelloReducer } from "@models/Game/othelloReducer";
import { atom } from "jotai";

const initial = Othello.initialize().values();

// 意図しない変更を防ぐため、primitive atomは非公開にしておく
const othelloAtom = atom<OthelloValues>(initial);

// 参照用read-only atom
export const othelloSelector = atom((get) => get(othelloAtom));

// 初期化用write-only atom
export const othelloInitializeExecutor = atom(null, (get, set) => {
  set(othelloAtom, initial);
});

// 更新用write-only atom
export const othelloUpdateExecutor = atom(null, (get, set, fieldId: FieldId) => {
  const current = Othello.reconstruct(get(othelloAtom));
  set(
    othelloAtom,
    othelloReducer(current, { type: "update", fieldId }).values()
  );
});
export const othelloSkipExecutor = atom(null, (get, set) => {
  const current = Othello.reconstruct(get(othelloAtom));
  set(othelloAtom, othelloReducer(current, { type: "skip" }).values());
});
