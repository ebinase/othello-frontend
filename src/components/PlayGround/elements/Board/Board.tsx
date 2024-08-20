import useOthello from "@hooks/useOthelloWithAtom";
import Field from "./Field";
import { FieldId } from "@models/Board/Board";
import { useCallback } from "react";

const Board: React.FC = () => {
  const { players, board, showMessage } = useOthello();
  const selectableFields = players.active.selectable;
  const update = useCallback(
    (fieldId: FieldId) => {
      const action = players.active.action;
      if (action?.type === "update") {
        action.update(fieldId);
      }
    },
    [players.active]
  );

  return (
    <>
      <div className="sm:w-96 sm:h-96 w-[90vmin] h-[90vmin] max-h-96 max-w-[24rem] bg-slate-200 grid grid-cols-8 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
        {board.map((content: any, index: number) => {
          return (
            <Field
              key={index}
              fieldId={index}
              content={content}
              isSelectable={selectableFields.includes(index)}
              update={selectableFields.includes(index) ? update : undefined}
              showMessage={showMessage}
            />
          );
        })}
      </div>
    </>
  );
};
export default Board;
