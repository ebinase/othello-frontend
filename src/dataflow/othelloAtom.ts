import { FieldId } from "@models/Board/Board";
import { Othello, OthelloValues } from "@models/Game/Othello";
import { othelloReducer } from "@models/Game/othelloReducer";
import { atom } from "jotai";
import { gameStatusUpdateExecutor } from "./gameStatusAtom";
import { messageUpdateExecutor } from "./messageAtom";

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
export type UpdateExecutor = (fieldId: FieldId) => void;
export const othelloUpdateExecutor = atom(null, (get, set, fieldId: FieldId) => {
  const current = Othello.reconstruct(get(othelloAtom));
  const updated = othelloReducer(current, { type: 'update', fieldId });
  if (updated.turnNumber > current.turnNumber) {
    // ターンが進んだ場合のみ更新
    set(othelloAtom, updated.values());
    set(gameStatusUpdateExecutor, updated.isOver() ? 'finished' : 'playing');
    set(messageUpdateExecutor, ''); // メッセージをクリア
  } else {
    set(messageUpdateExecutor, '置けませんでした！');
  }
});
export type SkipExecutor = () => void;
export const othelloSkipExecutor = atom(null, (get, set) => {
  const current = Othello.reconstruct(get(othelloAtom));
  const updated = othelloReducer(current, { type: 'skip' });
  if (updated.turnNumber > current.turnNumber) {
    set(othelloAtom, updated.values());
    set(gameStatusUpdateExecutor, updated.isOver() ? 'finished' : 'playing');
    set(messageUpdateExecutor, ''); // メッセージをクリア
  } else {
    set(messageUpdateExecutor, 'このターンはスキップできません！');
  }
});
