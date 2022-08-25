import { PlusIcon } from "@heroicons/react/24/outline";
import { modalState } from "atoms/modal";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Note from "./Note";

const Notes = () => {
  const [notes, setNotes] = React.useState([]);
  const [open, setOpen] = useRecoilState(modalState);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "notes"), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        let notes = snapshot?.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notes);
      }
    );
  }, []);

  function addNote() {
    setOpen(true);
  }

  return (
    <div>
      <div
        className="flex items-center justify-center gap-4 p-4 border-2 text-lg font-medium text-slate-400 dark:text-grey-light border-dashed hover:border-solid border-slate-400 dark:border-grey-medium cursor-pointer rounded-xl"
        onClick={addNote}
      >
        <PlusIcon width={24} />
        <p>Add note</p>
      </div>
      <div className="my-8 flex flex-col gap-4 rounded-lg">
        {notes.map((note: any) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
