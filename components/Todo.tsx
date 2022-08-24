import React from "react";
import classNames from "utils/classNames";
import Checkbox from "./Checkbox";
import moment from "moment";
import { EditPenIcon, TrashIcon } from "./icons";

const Todo = ({ todo, setTodos }: any) => {
  const handleTodos = () => {
    setTodos((prevTodos: any) => {
      return prevTodos.map((prevTodo: any) => {
        if (prevTodo.id === todo.id) {
          return {
            ...prevTodo,
            completed: !prevTodo.completed,
          };
        }
        return prevTodo;
      });
    });
  };

  return (
    <div
      className={classNames(
        "p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-black"
      )}
    >
      <div className="flex items-center gap-4">
        <Checkbox todo={todo} onClick={handleTodos} />
        <div className={classNames("flex-1")}>
          {moment(todo.createdAt).fromNow()}
        </div>
        <div className="flex gap-2 self-start">
          <button className="p-2 hover:bg-slate-200 rounded-lg">
            <EditPenIcon />
          </button>
          <button className="p-2 hover:bg-slate-200 rounded-lg">
            <TrashIcon />
          </button>
        </div>
      </div>
      <div>
        <h3
          className={classNames(
            "mt-4 text-lg font-medium",
            todo.completed ? "line-through" : ""
          )}
        >
          {todo.title}
        </h3>
      </div>
    </div>
  );
};

export default Todo;
