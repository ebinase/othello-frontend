import useOthello from "../../../../dataflow/othello/othello";
import Field, { FieldObject } from "./Field";

export type BoardData = Array<FieldObject>;

const Board: React.FC = () => {
  const { state, getAnalysis, moveHistory } = useOthello();
  const { selectableFields } = getAnalysis();
  const lastMove = moveHistory[moveHistory.length - 1];
  const flippedFieldIds =
    lastMove?.move.type === "update" ? lastMove.move.flipped : [];
  const newStoneFieldId =
    lastMove?.move.type === "update" ? lastMove.move.putAt : undefined;
  console.log(flippedFieldIds, newStoneFieldId);

  return (
    <>
      <div className="sm:w-96 sm:h-96 w-[90vmin] h-[90vmin] max-h-96 max-w-[24rem] bg-slate-200 grid grid-cols-8 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
        {state.board.map((content: any, index: number) => {
          return (
            <Field
              key={index}
              fieldId={index}
              content={content}
              isSelectable={selectableFields.includes(index)}
              isFlipped={flippedFieldIds.includes(index)}
              isNewStone={newStoneFieldId === index}
            />
          );
        })}
      </div>
    </>
  );
};
export default Board;
