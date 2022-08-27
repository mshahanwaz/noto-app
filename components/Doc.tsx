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
import Checkbox from "./Checkbox";
import { userDocState } from "atoms/userDoc";
import { readDocIdModal, readModal } from "atoms/readModal";

const Doc = ({ doc: currDoc }: any) => {
  const [open, setOpen] = useRecoilState(modalState);
  const [edit, setEdit] = useRecoilState(editModalState);
  const [newId, setNewId] = useRecoilState(docIdState);
  const [type, setType] = useRecoilState(typeModalState);
  const [userDoc, setUserDoc] = useRecoilState(userDocState);
  const [readOpen, setReadOpen] = useRecoilState(readModal);
  const [readDocId, setReadDocId] = useRecoilState(readDocIdModal);

  async function handleDeleteDoc() {
    setUserDoc((userDoc: any) => {
      return {
        ...userDoc,
        [type]: userDoc?.[type]?.filter((doc: any) => doc?.id !== currDoc?.id),
      };
    });
    await deleteDoc(doc(db, "users", userDoc?.uid, type, currDoc?.id));
  }

  function handleUpdateDoc() {
    setOpen(true);
    setEdit(true);
    setNewId(currDoc?.id);
  }

  const markTodo = async () => {
    let isCompleted = userDoc?.todos?.filter(
      (doc: any) => doc?.id === currDoc?.id
    )[0]?.completed;

    setUserDoc((userDoc: any) => {
      return {
        ...userDoc,
        todos: userDoc?.[type]?.map((doc: any) =>
          doc?.id === currDoc?.id
            ? {
                ...doc,
                completed: !isCompleted,
              }
            : doc
        ),
      };
    });

    await updateDoc(doc(db, "users", userDoc?.uid, "todos", currDoc?.id), {
      completed: !isCompleted,
    });
  };

  function handleReadDocOpen() {
    setReadOpen(true);
    setReadDocId(currDoc?.id);
  }

  return (
    <div
      className={classNames(
        "p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-black dark:bg-grey-dark dark:text-grey-light dark:hover:bg-black"
      )}
    >
      <div className="flex items-center gap-4">
        {type === "notes" ? (
          <button
            className="p-2 hover:bg-slate-300 bg-slate-200 dark:bg-grey-light dark:hover:bg-white dark:text-black rounded-lg"
            onClick={handleReadDocOpen}
          >
            <FileIcon />
          </button>
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
        <h3 className="mt-4 text-lg font-semibold dark:text-white truncate">
          {currDoc?.title}
        </h3>
        {type === "notes" && (
          <pre className="font-sans text-md text-slate-500 dark:text-grey-light line-clamp-1">
            {currDoc?.content}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Doc;
