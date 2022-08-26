import { Dialog, Transition } from "@headlessui/react";
import {
  docIdState,
  typeModalState,
  editModalState,
  modalState,
} from "atoms/modal";
import React from "react";
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
  const [newId, setNewId] = useRecoilState(docIdState);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const { data: session }: any = useSession();

  React.useEffect(() => {
    async function getDocs() {
      await onSnapshot(collection(db, type), (snapshot: any) => {
        let doc = snapshot?.docs
          ?.filter((doc: any) => doc.id === newId)[0]
          ?.data();
        setTitle((title) => doc?.title || title);
        if (type === "notes") setContent((content) => doc?.content || content);
      });
    }
    getDocs();
  }, [newId, type]);

  async function handleAdd() {
    if (loading) return;

    if (type === "notes" && title && content) {
      setLoading(true);
      await addDoc(collection(db, "notes"), {
        uid: session?.user?.uid,
        username: session?.user?.username,
        email: session?.user?.email,
        title: title,
        content: content,
        profilePic: session?.user?.image,
        timestamp: serverTimestamp(),
      });
    } else if (type === "todos") {
      setLoading(true);
      await addDoc(collection(db, "todos"), {
        uid: session?.user?.uid,
        username: session?.user?.username,
        email: session?.user?.email,
        title: title,
        profilePic: session?.user?.image,
        timestamp: serverTimestamp(),
        completed: false,
      });
    }

    handleClose();
  }

  async function handleUpdate() {
    if (loading) return;

    if (type === "notes" && title && content) {
      setLoading(true);
      await updateDoc(doc(db, "notes", newId), {
        title: title,
        content: content,
        updated: serverTimestamp(),
      });
    } else if (type === "todos" && title) {
      setLoading(true);
      await updateDoc(doc(db, "todos", newId), {
        title: title,
        updated: serverTimestamp(),
      });
    }

    handleClose();
  }

  function handleClose() {
    setOpen(false);
    setLoading(false);
    setTimeout(() => {
      setTitle("");
      setContent("");
      setEdit(false);
    }, 500);
  }

  return (
    <div>
      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
                  <div className="my-4 flex flex-col gap-4">
                    <input
                      type="text"
                      className="p-2 border-2 dark:border-grey-light dark:focus:border-grey w-full rounded-lg outline-none"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {type === "notes" && (
                      <textarea
                        className="p-2 border-2 dark:border-grey-light dark:focus:border-grey w-full rounded-lg h-24 outline-none"
                        placeholder={`${
                          edit ? "Update" : "Write"
                        } ${type.substring(0, type.length - 1)} here...`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !title?.length ||
                      (type === "notes" && !content?.length)
                    }
                    className={classNames(
                      "inline-flex justify-center rounded-md border border-transparent bg-slate-100 dark:bg-grey dark:text-white px-4 py-2 font-medium text-black hover:bg-slate-200 dark:hover:bg-black dark:hover:text-white",
                      "disabled:text-slate-400 dark:disabled:text-white dark:disabled:bg-grey-light disabled:cursor-not-allowed"
                    )}
                    onClick={edit ? handleUpdate : handleAdd}
                  >
                    {loading
                      ? `${edit ? "Updating" : "Adding"}...`
                      : `${edit ? "Update" : "Add"} ${type.substring(
                          0,
                          type.length - 1
                        )}`}
                  </button>
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
