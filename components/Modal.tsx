import { Dialog, Transition } from "@headlessui/react";
import {
  docIdState,
  typeModalState,
  editModalState,
  openModal,
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
  query,
  orderBy,
} from "@firebase/firestore";
import { db } from "../firebase";
import classNames from "utils/classNames";
import { useSession } from "next-auth/react";

const Modal = () => {
  const [open, setOpen] = useRecoilState(openModal);
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
    if (session) {
      const collectionRef = collection(db, "users", session?.user?.uid, type);
      return onSnapshot(collectionRef, (snapshot: any) => {
        let existingDoc = snapshot?.docs?.filter(
          (doc: any) => doc?.id === docId
        )[0];
        setTitle(existingDoc?.data()?.title || "");
        if (type === "notes") setContent(existingDoc?.data()?.content || "");
      });
    }
  }, [session, docId, type]);

  async function handleAddDoc(e: any) {
    e.preventDefault();

    if (loading) return;
    if (!addTitle || (type === "notes" && !addContent)) return;

    setLoading(true);

    const docRef = await addDoc(
      collection(db, "users", session?.user?.uid, type),
      {
        title: addTitle,
        ...(type === "notes" && { content: addContent }),
        timestamp: serverTimestamp(),
        ...(type === "todos" && { completed: false }),
      }
    );

    await updateDoc(doc(db, "users", session?.user?.uid, type, docRef.id), {
      id: docRef.id,
    });

    handleCloseModal();
  }

  async function handleUpdateDoc(e: any) {
    e.preventDefault();

    if (loading) return;
    if (!title || (type === "notes" && !content)) return;

    setLoading(true);

    await updateDoc(doc(db, "users", session?.user?.uid, type, docId), {
      title: title,
      ...(type === "notes" && { content: content }),
      updated: serverTimestamp(),
    });

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
    let value = e.target.value;
    if (edit) {
      setTitle(value);
    } else {
      setAddTitle(value);
    }
  }

  function handleTextAreaChange(e: any) {
    let value = e.target.value;
    if (edit) {
      setContent(value);
    } else {
      setAddContent(value);
    }
  }

  function handleDisable() {
    return (
      loading ||
      (edit && (!title || (type === "notes" && !content))) ||
      (!edit && (!addTitle || (type === "notes" && !addContent)))
    );
  }

  return (
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
                        className="p-2 border-2 max-h-[200px] dark:border-grey-light focus:border-grey w-full rounded-lg h-24 outline-none"
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
  );
};
export default Modal;
