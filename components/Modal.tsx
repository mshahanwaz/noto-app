import { Dialog, Transition } from "@headlessui/react";
import {
  docIdState,
  typeModalState,
  editModalState,
  modalState,
} from "atoms/modal";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import classNames from "utils/classNames";

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [type, setType] = useRecoilState(typeModalState);
  const [edit, setEdit] = useRecoilState(editModalState);
  const [docId, setDocId] = useRecoilState(docIdState);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [addTitle, setAddTitle] = React.useState("");
  const [addContent, setAddContent] = React.useState("");
  const { data: session }: any = useSession();

  useEffect(() => {
    async function loadDoc() {
      await onSnapshot(collection(db, type), (snapshot: any) => {
        let docWithId = snapshot?.docs
          ?.filter((doc: any) => doc.id === docId)[0]
          ?.data();
        setTitle(docWithId?.title);
        if (type === "notes") setContent(docWithId?.content);
      });
    }

    loadDoc();
  }, [docId]); // eslint-disable-line

  async function handleAddDoc(e: any) {
    e.preventDefault();

    if (loading) return;
    if (!addTitle || (type === "notes" && !addContent)) return;

    setLoading(true);
    if (type === "notes") {
      await addDoc(collection(db, "notes"), {
        uid: session?.user?.uid,
        username: session?.user?.username,
        email: session?.user?.email,
        title: addTitle,
        content: addContent,
        profilePic: session?.user?.image,
        timestamp: serverTimestamp(),
      });
    } else {
      await addDoc(collection(db, "todos"), {
        uid: session?.user?.uid,
        username: session?.user?.username,
        email: session?.user?.email,
        title: addTitle,
        profilePic: session?.user?.image,
        timestamp: serverTimestamp(),
        completed: false,
      });
    }

    handleCloseModal();
  }

  async function handleUpdateDoc(e: any) {
    e.preventDefault();

    if (loading) return;
    if (!title || (type === "notes" && !content)) return;

    setLoading(true);
    if (type === "notes") {
      await updateDoc(doc(db, "notes", docId), {
        title: title,
        content: content,
        updated: serverTimestamp(),
      });
    } else {
      await updateDoc(doc(db, "todos", docId), {
        title: title,
        updated: serverTimestamp(),
      });
    }

    handleCloseModal();
  }

  function handleCloseModal() {
    setOpen(false);
    setLoading(false);
    setTimeout(() => {
      setEdit(false);
      setDocId("");
      setTitle("");
      setContent("");
      setAddTitle("");
      setAddContent("");
    }, 1000);
  }

  function handleInputChange(e: any) {
    let val = e.target.value;

    if (edit) {
      setTitle(val);
    } else {
      setAddTitle(val);
    }
  }

  function handleTextAreaChange(e: any) {
    let val = e.target.value;

    if (edit) {
      setContent(val);
    } else {
      setAddContent(val);
    }
  }

  function handleDisable() {
    let disable =
      loading ||
      (edit && (!title || (type === "notes" && !content))) ||
      (!edit && (!addTitle || (type === "notes" && !addContent)));
    return disable;
  }

  return (
    <div>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    {edit ? "Update" : "Add"} {type}
                  </Dialog.Title>
                  <form onSubmit={edit ? handleUpdateDoc : handleAddDoc}>
                    <div className="my-4 flex flex-col gap-4">
                      <input
                        type="text"
                        className="p-2 border-2 dark:border-grey-light focus:border-grey w-full rounded-lg outline-none"
                        placeholder="Title"
                        value={edit ? title : addTitle}
                        onChange={handleInputChange}
                      />
                      {type === "notes" && (
                        <textarea
                          className="p-2 border-2 dark:border-grey-light focus:border-grey w-full rounded-lg h-24 outline-none"
                          placeholder={`${
                            edit ? "Update" : "Write"
                          } ${type.substring(0, type.length - 1)} here...`}
                          value={edit ? content : addContent}
                          onChange={handleTextAreaChange}
                        />
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={handleDisable()}
                      className={classNames(
                        "inline-flex justify-center rounded-md border border-transparent bg-grey dark:bg-grey dark:text-white px-4 py-2 font-medium text-white hover:bg-black dark:hover:text-white",
                        "disabled:text-white disabled:bg-grey-light disabled:cursor-not-allowed"
                      )}
                    >
                      {loading
                        ? `${edit ? "Updating" : "Adding"}...`
                        : `${edit ? "Update" : "Add"} ${type.substring(
                            0,
                            type.length - 1
                          )}`}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
export default Modal;
