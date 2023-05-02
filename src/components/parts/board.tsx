import { OthelloDispatcher } from "../../hooks/othello/useOthello";
import Field, { FieldObject } from "./field";

export type BoardData = Array<FieldObject>;

type Props = { board: BoardData; dispatch?: OthelloDispatcher };

const Board: React.FC<Props> = (props) => {
  return (
    <>
      <div className="sm:w-96 sm:h-96 w-[90vmin] h-[90vmin] max-h-96 max-w-[24rem] bg-slate-200 grid grid-cols-8 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
        {props.board.map((content: any, index: number) => {
          return (
            <Field
              key={index}
              fieldId={index}
              content={content}
              dispatcher={props?.dispatch}
            />
          );
        })}
      </div>
    </>
  );
};
export default Board;
