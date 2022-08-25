import React from "react";
import classNames from "utils/classNames";

const Checkbox = ({ todo, onClick }: any) => {
  return (
    <div
      className="rounded-lg p-2 hover:bg-slate-200 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={classNames(
          "flex items-center justify-center w-5 h-5 border-2 rounded-md group border-black"
        )}
      >
        <span
          className={classNames(
            "w-3 h-3 rounded group-hover:bg-black",
            todo.completed && "bg-black"
          )}
        />
      </div>
    </div>
  );
};

export default Checkbox;
