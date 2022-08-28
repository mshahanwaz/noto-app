import React from "react";
import classNames from "utils/classNames";
import moment from "moment";
import { EditPenIcon, FileIcon, TrashIcon } from "./icons";
import { useRecoilState } from "recoil";
import {
  docIdState,
  editModalState,
  openModal,
  typeModalState,
} from "atoms/modal";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Checkbox from "./Checkbox";
import { readDocIdModal, readModal } from "atoms/readModal";
import { useSession } from "next-auth/react";

const Doc = ({ doc: currDoc }: any) => {
  const [open, setOpen] = useRecoilState(openModal);
  const [edit, setEdit] = useRecoilState(editModalState);
  const [newId, setNewId] = useRecoilState(docIdState);
  const [type, setType] = useRecoilState(typeModalState);
  const [readOpen, setReadOpen] = useRecoilState(readModal);
  const [readDocId, setReadDocId] = useRecoilState(readDocIdModal);
  const { data: session }: any = useSession();

  async function handleDeleteDoc() {
    await deleteDoc(doc(db, "users", session?.user?.uid, type, currDoc?.id));
  }

  function handleUpdateDoc() {
    setOpen(true);
    setEdit(true);
    setNewId(currDoc?.id);
  }

  const markTodo = async () => {
    await updateDoc(
      doc(db, "users", session?.user?.uid, "todos", currDoc?.id),
      {
        completed: !currDoc?.completed,
      }
    );
  };

  function handleReadDocOpen() {
    setReadOpen(true);
    setReadDocId(currDoc?.id);
  }

  return (
    <div
      className={classNames(
        "p-4 text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-2xl dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 transition-colors"
      )}
    >
      <div className="flex items-center gap-2">
        {type === "notes" ? (
          <button
            className="p-2 text-gray-900 hover:text-gray-50 hover:bg-gray-900 dark:hover:bg-gray-50 dark:text-gray-50 dark:hover:text-gray-900 rounded-lg transition-all"
            onClick={handleReadDocOpen}
          >
            <FileIcon />
          </button>
        ) : (
          <Checkbox doc={currDoc} onClick={markTodo} />
        )}
        <div className={classNames("flex-1 text-gray-500 dark:text-gray-400")}>
          {currDoc?.updated
            ? `${moment(currDoc?.updated?.toDate()).fromNow()}(edited)`
            : moment(currDoc?.timestamp?.toDate()).fromNow()}
        </div>
        <div className="flex gap-2 self-start">
          <CustomButton onClick={handleUpdateDoc}>
            <EditPenIcon />
          </CustomButton>
          <CustomButton onClick={handleDeleteDoc}>
            <TrashIcon />
          </CustomButton>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <h3 className="text-lg font-semibold dark:text-gray-50 truncate">
          {currDoc?.title}
        </h3>
        {type === "notes" && (
          <pre className="font-sans text-gray-700 dark:text-gray-300 line-clamp-1">
            {currDoc?.content}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Doc;

const CustomButton = ({ children, ...props }: any) => {
  return (
    <button
      className="p-2 hover:text-gray-50 hover:bg-gray-900 dark:hover:bg-gray-50 dark:hover:text-gray-900 rounded-lg transition-all"
      {...props}
    >
      {children}
    </button>
  );
};
