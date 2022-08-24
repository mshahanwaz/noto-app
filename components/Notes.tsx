import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import Note from "./Note";

const notesList = [
  {
    id: 1,
    title: "note 1",
    content:
      "nnote 1 content lorem ipsumnote 1 content lorem ipsumnote 1 content lorem ipsumnote 1 content lorem ipsumnote 1 content lorem ipsumnote 1 content lorem ipsumote 1 content lorem ipsum",
    completed: false,
    createdAt: 1661146600000,
  },
  {
    id: 2,
    title: "note 2",
    content: "note 2 content",
    completed: true,
    createdAt: 1661346609618,
  },
  {
    id: 3,
    title: "note 3",
    content: "note 3 content",
    completed: false,
    createdAt: 1661347607618,
  },
  {
    id: 4,
    title: "note 4",
    content: "note 4 content",
    completed: true,
    createdAt: 1661346609618,
  },
  {
    id: 5,
    title: "note 5",
    content: "note 5 content",
    createdAt: 1661347607618,
  },
];

const Notes = () => {
  const [notes, setNotes] = React.useState(notesList);

  return (
    <div className="">
      <div className="flex items-center justify-center gap-4 p-4 border-2 text-lg font-medium text-slate-400 border-dashed hover:border-solid border-slate-400 cursor-pointer rounded-xl">
        <PlusIcon width={24} />
        <p>Add note</p>
      </div>
      <div className="my-8 flex flex-col gap-4 overflow-y-auto h-[500px] rounded-lg">
        {notes.map((note) => (
          <Note key={note.id} note={note} setNotes={setNotes} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
