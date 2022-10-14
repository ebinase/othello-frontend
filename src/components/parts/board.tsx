import { OthelloDispatcher } from "../../hooks/use-othello";
import Field, { FieldObject } from "./field";

export type BoardData = Array<FieldObject>;

type Props = { board: BoardData; dispatch: OthelloDispatcher };

const Board: React.FC<Props> = (props) => {
  return (
    <>
      <div className="h-96 w-96 bg-slate-200 grid grid-cols-8 gap-1 p-2 rounded-lg shadow-[5px_5px_5px_#bebebe,-5px_-5px_5px_#ffffff]">
        {props.board.map((content: any, index: number) => {
          return (
            <Field
              key={index}
              fieldId={index}
              content={content}
              dispatcher={props.dispatch}
            />
          );
        })}
      </div>
    </>
  );
};
export default Board;
