import { PlusIcon } from "@heroicons/react/24/outline";
import { modalState, typeModalState } from "atoms/modal";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Doc from "./Doc";

const Docs = () => {
  const [docs, setDocs] = React.useState([]);
  const [open, setOpen] = useRecoilState(modalState);
  const [type, setType] = useRecoilState(typeModalState);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, type), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        let docs = snapshot?.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDocs(docs);
      }
    );
  }, [type]);

  function handleAddDoc() {
    setOpen(true);
  }

  return (
    <div>
      <div
        className="flex items-center justify-center gap-4 p-4 border-2 text-lg font-medium text-slate-400 dark:text-grey-light border-dashed hover:border-solid border-slate-400 dark:border-grey-medium cursor-pointer rounded-xl"
        onClick={handleAddDoc}
      >
        <PlusIcon width={24} />
        <p>Add {type.substring(0, type.length - 1)}</p>
      </div>
      <div className="my-8 flex flex-col gap-4 rounded-lg">
        <div>
          {docs.map(
            (doc: any) =>
              (type === "notes" || !doc?.completed) && (
                <Doc key={doc?.id} doc={doc} />
              )
          )}
        </div>
      </div>

      {type === "todos" && (
        <div className="my-8">
          <p className="pb-4 dark:text-grey-light">
            Completed -{" "}
            <strong>
              {docs.filter((doc: any) => doc?.completed).length}/{docs.length}
            </strong>
          </p>
          <div className="flex flex-col gap-4 rounded-lg">
            {docs.map(
              (doc: any) => doc?.completed && <Doc key={doc?.id} doc={doc} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Docs;
