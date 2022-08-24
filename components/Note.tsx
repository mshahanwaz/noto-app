import React from "react";
import classNames from "utils/classNames";
import Checkbox from "./Checkbox";
import moment from "moment";
import { EditPenIcon, FileIcon, TrashIcon } from "./icons";

const Note = ({ note, setTodos }: any) => {
  const handleTodos = () => {
    setTodos((prevTodos: any) => {
      return prevTodos.map((prevTodo: any) => {
        if (prevTodo.id === note.id) {
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
        <span className="p-2 bg-slate-200 rounded-lg">
          <FileIcon />
        </span>
        <div className={classNames("flex-1")}>
          {moment(note.createdAt).fromNow()}
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
        <h3 className="mt-4 text-lg font-semibold">{note.title}</h3>
        <p className="text-md text-slate-500 truncate">{note.content}</p>
      </div>
    </div>
  );
};

export default Note;
