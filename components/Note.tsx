import React from "react";
import classNames from "utils/classNames";
import moment from "moment";
import { EditPenIcon, FileIcon, TrashIcon } from "./icons";
import { useRecoilState } from "recoil";
import {
  docIdState,
  editModalState,
  modalState,
  typeModalState,
} from "atoms/modal";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const Note = ({ note }: any) => {
  const [open, setOpen] = useRecoilState(modalState);
  const [edit, setEdit] = useRecoilState(editModalState);
  const [newId, setNewId] = useRecoilState(docIdState);

  async function handleDelete() {
    await deleteDoc(doc(db, "notes", note?.id));
  }

  function handleUpdate() {
    setOpen(true);
    setEdit(true);
    setNewId(note?.id);
  }

  return (
    <div
      className={classNames(
        "p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-black"
      )}
    >
      <div className="flex items-center gap-4">
        <span className="p-2 hover:bg-slate-200 rounded-lg">
          <FileIcon />
        </span>
        <div className={classNames("flex-1")}>
          {note?.updated
            ? `${moment(note?.updated?.toDate()).fromNow()}(edited)`
            : moment(note?.timestamp?.toDate()).fromNow()}
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
        <h3 className="mt-4 text-lg font-semibold">{note.title}</h3>
        <p className="text-md text-slate-500 truncate">{note.content}</p>
      </div>
    </div>
  );
};

export default Note;
