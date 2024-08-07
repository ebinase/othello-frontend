import { Othello } from "@models/Game/Othello";

type updateAction = {
  type: "update";
  fieldId: number;
};

type skipAction = {
  type: "skip";
};

type clearAction = {
  type: "clear";
};

type Action = updateAction | skipAction | clearAction;

/**
 * オセロの状態を更新するReducer
 * ターンをまたいでオセロのルールを司る
 * @param state
 * @param action
 * @returns
 */
export const othelloReducer = (current: Othello, action: Action): Othello => {
  switch (action.type) {
    case "update":
      const result = current.move(action.fieldId);
      return result.when({
        success: (next) => next,
        failure: () => current,
      });
    case "skip":
      const skipResult = current.skip();
      return skipResult.when({
        success: (next) => next,
        failure: () => current,
      });
    case "clear":
      return Othello.initialize();
  }
};
