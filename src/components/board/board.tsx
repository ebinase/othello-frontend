import type * as React from "react";
import Field from "./field";

const Board: React.FC = () => {
  return (
    <div
      style={{
        "border-radius": "8px",
        "box-shadow": "5px 5px 5px #bebebe,-5px -5px 5px #ffffff",
      }}
    >
      <Field />
    </div>
  );
};
export default Board;
