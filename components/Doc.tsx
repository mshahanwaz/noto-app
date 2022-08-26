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
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";
import Checkbox from "./Checkbox";

const Doc = ({ doc: currDoc }: any) => {
  const [open, setOpen] = useRecoilState(modalState);
  const [edit, setEdit] = useRecoilState(editModalState);
  const [newId, setNewId] = useRecoilState(docIdState);
  const [type, setType] = useRecoilState(typeModalState);
  const [completed, setCompleted] = React.useState(currDoc?.completed || false);

  async function handleDeleteDoc() {
    await deleteDoc(doc(db, type, currDoc?.id));
  }

  function handleUpdateDoc() {
    setOpen(true);
    setEdit(true);
    setNewId(currDoc?.id);
  }

  const markTodo = async () => {
    await updateDoc(doc(db, "todos", currDoc?.id), {
      completed: !completed,
    });
    setCompleted(!completed);
  };

  return (
    <div
      className={classNames(
        "p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-black dark:bg-grey-dark dark:text-grey-light dark:hover:bg-black"
      )}
    >
      <div className="flex items-center gap-4">
        {type === "notes" ? (
          <Link href="/">
            <a className="p-2 hover:bg-slate-300 bg-slate-200 dark:bg-grey-light dark:hover:bg-white dark:text-black rounded-lg">
              <FileIcon />
            </a>
          </Link>
        ) : (
          <Checkbox doc={currDoc} onClick={markTodo} />
        )}
        <div className={classNames("flex-1")}>
          {currDoc?.updated
            ? `${moment(currDoc?.updated?.toDate()).fromNow()}(edited)`
            : moment(currDoc?.timestamp?.toDate()).fromNow()}
        </div>
        <div className="flex gap-2 self-start">
          <button
            className="p-2 hover:bg-slate-200 dark:hover:bg-white dark:hover:text-black rounded-lg"
            onClick={handleUpdateDoc}
          >
            <EditPenIcon />
          </button>
          <button
            className="p-2 hover:bg-slate-200 dark:hover:bg-white dark:hover:text-black rounded-lg"
            onClick={handleDeleteDoc}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
      <div>
        <h3 className="mt-4 text-lg font-semibold dark:text-white">
          {currDoc?.title}
        </h3>
        {type === "notes" && (
          <p className="text-md text-slate-500 dark:text-grey-light truncate">
            {currDoc?.content}
          </p>
        )}
      </div>
    </div>
  );
};

export default Doc;
