import React from "react";
import classNames from "utils/classNames";
import Checkbox from "./Checkbox";
import moment from "moment";
import { EditPenIcon, TrashIcon } from "./icons";
import { useRecoilState } from "recoil";
import {
  docIdState,
  editModalState,
  modalState,
  typeModalState,
} from "atoms/modal";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Todo = ({ todo }: any) => {
  const [open, setOpen] = useRecoilState(modalState);
  const [type, setType] = useRecoilState(typeModalState);
  const [edit, setEdit] = useRecoilState(editModalState);
  const [newId, setNewId] = useRecoilState(docIdState);
  const [completed, setCompleted] = React.useState(todo.completed);

  const toggleCompleteTodo = async () => {
    await updateDoc(doc(db, "todos", todo?.id), {
      completed: !completed,
    });
    setCompleted(!completed);
  };

  async function handleDelete() {
    await deleteDoc(doc(db, "todos", todo?.id));
  }

  function handleUpdate() {
    setOpen(true);
    setType("todos");
    setEdit(true);
    setNewId(todo?.id);
  }

  return (
    <div
      className={classNames(
        "p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-black"
      )}
    >
      <div className="flex items-center gap-4">
        <Checkbox todo={todo} onClick={toggleCompleteTodo} />
        <div className={classNames("flex-1")}>
          {todo?.updated
            ? `${moment(todo?.updated?.toDate()).fromNow()}(edited)`
            : moment(todo?.timestamp?.toDate()).fromNow()}
        </div>
        <div className="flex gap-2 self-start">
          <button
            className="p-2 hover:bg-slate-200 rounded-lg"
            onClick={handleUpdate}
          >
            <EditPenIcon />
          </button>
          <button
            className="p-2 hover:bg-slate-200 rounded-lg"
            onClick={handleDelete}
          >
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