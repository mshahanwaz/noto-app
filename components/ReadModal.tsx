import { Dialog, Transition } from "@headlessui/react";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { readDocIdModal, readModal } from "atoms/readModal";
import { ArrowLeftIcon } from "./icons";
import moment from "moment";
import { useSession } from "next-auth/react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { typeModalState } from "atoms/modal";

const ReadModal = () => {
  const [open, setOpen] = useRecoilState(readModal);
  const [doc, setDoc] = React.useState<any>({});
  const [type, setType] = useRecoilState(typeModalState);
  const [readDocId, setReadDocId] = useRecoilState(readDocIdModal);
  const { data: session }: any = useSession();

  useEffect(() => {
    if (open && session) {
      const collectionRef = collection(db, "users", session?.user?.uid, type);
      return onSnapshot(collectionRef, (snapshot: any) => {
        setDoc(snapshot?.docs?.filter((doc: any) => doc.id === readDocId)[0]);
      });
    }
  }, [session, open, readDocId, type]);

  function handleCloseModal() {
    setReadDocId("");
    setOpen(false);
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 text-left shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <button
                    className="p-2 bg-grey hover:bg-black text-white rounded-lg"
                    onClick={handleCloseModal}
                  >
                    <ArrowLeftIcon />
                  </button>
                  <span>
                    {doc?.updated
                      ? `${moment(doc?.updated?.toDate()).format(
                          "lll"
                        )}(edited)`
                      : moment(doc?.updated?.toDate()).format("lll")}
                  </span>
                </div>
                <Dialog.Title as="h3" className="my-4 text-2xl font-bold">
                  {doc?.title}
                </Dialog.Title>
                <pre className="font-sans w-full font-medium whitespace-pre-wrap">
                  <Dialog.Description>{doc?.content}</Dialog.Description>
                </pre>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReadModal;
