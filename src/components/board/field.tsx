import type * as React from "react";

const Field: React.FC = () => {
  return (
    <>
      <div
        className="h-96 w-96 bg-slate-200 grid grid-cols-2 gap-2 p-5"
        style={{
          "border-radius": "8px",
          "box-shadow": "10px 10px 20px #bebebe,-10px -10px 20px #ffffff",
        }}
      >
        <div
          style={{
            "border-radius": "8px",
            "box-shadow": "1px 1px 5px #bebebe,-5px -5px 10px #ffffff",
          }}
        ></div>
        <div
          style={{
            "border-radius": "8px",
            "box-shadow": "1px 1px 5px #bebebe,-5px -5px 10px #ffffff",
          }}
        ></div>
        <div
          style={{
            "border-radius": "8px",
            "box-shadow": "1px 1px 5px #bebebe,-5px -5px 10px #ffffff",
          }}
        ></div>
        <div
          style={{
            "border-radius": "8px",
            "box-shadow": "1px 1px 5px #bebebe,-5px -5px 10px #ffffff",
          }}
        ></div>
      </div>
    </>
  );
};

export default Field;
