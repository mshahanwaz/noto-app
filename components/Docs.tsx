import { PlusIcon } from "@heroicons/react/24/outline";
import { openModal, typeModalState } from "atoms/modal";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Doc from "./Doc";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useSession } from "next-auth/react";
import { EmptyIllustration } from "./illustrations";
import Loader from "./Loader";

const Docs = () => {
  const [open, setOpen] = useRecoilState(openModal);
  const [type, setType] = useRecoilState(typeModalState);
  const [loading, setLoading] = React.useState(false);
  const [docs, setDocs] = React.useState([]);
  const { data: session }: any = useSession();

  useEffect(() => {
    if (session) {
      setLoading(true);
      const collectionRef = collection(db, "users", session?.user?.uid, type);
      const collectionQuery = query(
        collectionRef,
        orderBy("timestamp", "desc")
      );
      return onSnapshot(collectionQuery, (snapshot: any) => {
        setDocs(snapshot?.docs.map((doc: any) => doc.data()));
        setLoading(false);
      });
    }
  }, [session, type]);

  function handleAddDoc() {
    setOpen(true);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="px-4 py-8 max-w-xl mx-auto">
      <div
        className="flex items-center justify-center gap-4 p-4 border-2 text-lg font-medium text-gray-400 dark:text-grey-medium border-dashed hover:border-solid border-gray-400 dark:border-grey-medium hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer rounded-xl"
        onClick={handleAddDoc}
      >
        <PlusIcon width={24} />
        <p>Add {type.substring(0, type.length - 1)}</p>
      </div>
      {docs.length === 0 ? (
        <div className="max-w-xs mx-auto mt-10">
          <EmptyIllustration />
        </div>
      ) : (
        <>
          <div className="my-8 flex flex-col gap-4 rounded-lg">
            {docs?.map(
              (doc: any) =>
                (type === "notes" || !doc?.completed) && (
                  <Doc key={doc?.id} doc={doc} />
                )
            )}
          </div>
          {type === "todos" && (
            <div className="my-8">
              <p className="pb-4 text-gray-600 dark:text-grey-light">
                Completed -{" "}
                <strong>
                  {docs?.filter((doc: any) => doc?.completed).length}/
                  {docs?.length}
                </strong>
              </p>
              <div className="flex flex-col gap-4 rounded-lg">
                {docs?.map(
                  (doc: any) =>
                    doc?.completed && <Doc key={doc?.id} doc={doc} />
                )}
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Docs;
