import { atom } from 'jotai';
import { PlayersAtomValue, playersInitializeExecutor, playersSelector, playersUpdateExecutor } from './playersAtom';
import { othelloInitializeExecutor } from './othelloAtom';

export type GameStatus = 'not_started' | 'playing' | 'finished';

const gameStatusAtom = atom<GameStatus>('not_started');

export const gameStatusSelector = atom((get) => get(gameStatusAtom));

// ステートマシンを使って状態を遷移させるためのatom
export const gameStatusUpdateExecutor = atom(null, (get, set, next: GameStatus) => {
  const current = get(gameStatusAtom);
  if (current === next) {
    // 同じ状態に遷移しようとしている場合は何もしない
    return;
  }
  if (isAllowedTransition(current, next)) {
    set(gameStatusAtom, next);
  } else {
    throw new Error(`Invalid transition: ${current} -> ${next}`);  // ここにヒットしたらバグがある
  }
});

// ゲーム全体の初期化
export const gameInitializeExecutor = atom(null, (get, set) => {
  set(gameStatusUpdateExecutor, 'not_started'); // 'not_started'にはいつでも遷移可能
  set(playersInitializeExecutor);
  set(othelloInitializeExecutor);
});

// ゲームの開始
export const gameStartExecutor = atom(null, (get, set, players: PlayersAtomValue) => {
  set(gameStatusUpdateExecutor, 'playing');
  set(playersUpdateExecutor, players);
});

// ゲームを同じ設定でリスタート
export const gameRestartExecutor = atom(null, (get, set) => {
  // 現在のプレイヤー情報を取得しておく
  const players = get(playersSelector);
  // 全体を初期化
  set(gameInitializeExecutor);
  // その後、前回の設定を使用してゲームを開始
  set(gameStatusUpdateExecutor, 'playing');
  set(playersUpdateExecutor, players);
});


/// 状態遷移定義(TODO: 必要に応じてXStateを利用する)
const isAllowedTransition = (from: GameStatus, to: GameStatus) => {
  const allowed = gameStatusMachine(from);
  return allowed.includes(to);
}

// 基本形
// 'not_started' -> 'playing' -> 'finished'
//
// 'not_started' -> 'playing' OK
// 'not_started' -> 'finished' NG(開始前に終了することはない)
// 'playing' -> 'finished' OK
// 'playing' -> 'not_started' OK
// 'finished' -> 'not_started' OK
// 'finished' -> 'playing' NG(終了後に再開することはなく、かならずリセットする)
const gameStatusMachine = (current: GameStatus) => {
  switch (current) {
    case 'not_started':
      return ['playing'];
    case 'playing':
      return ['not_started', 'finished'];
    case 'finished':
      return ['not_started'];
  }
}