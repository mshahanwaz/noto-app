import React from "react";
import classNames from "utils/classNames";

const Checkbox = ({ todo, onClick }: any) => {
  return (
    <div
      className="rounded-lg p-2 bg-slate-200 hover:bg-slate-300 dark:bg-grey-light dark:hover:bg-white cursor-pointer group"
      onClick={onClick}
    >
      <div
        className={classNames(
          "flex items-center justify-center w-5 h-5 border-2 rounded-md border-black"
        )}
      >
        <span
          className={classNames(
            "w-3 h-3 rounded group-hover:bg-black scale-0 group-hover:scale-100 transition-all",
            todo.completed && "bg-black scale-100"
          )}
        />
      </div>
    </div>
  );
};

export default Checkbox;
