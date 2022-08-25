import { PlusIcon } from "@heroicons/react/24/outline";
import { modalState } from "atoms/modal";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import Todo from "./Todo";

const Todos = () => {
  const [todos, setTodos] = React.useState<any>([]);
  const [open, setOpen] = useRecoilState(modalState);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "todos"), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        let todos = snapshot?.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todos);
      }
    );
  }, [todos]);

  function addTodo() {
    setOpen(true);
  }

  return (
    <div className="">
      <div
        className="flex items-center justify-center gap-4 p-4 border-2 text-lg font-medium text-slate-400 dark:text-grey-light border-dashed hover:border-solid border-slate-400 dark:border-grey-medium cursor-pointer rounded-xl"
        onClick={addTodo}
      >
        <PlusIcon width={24} />
        <p>Add todo</p>
      </div>
      <div className="my-8 flex flex-col gap-4 rounded-lg">
        {todos.map(
          (todo: any) =>
            !todo?.completed && (
              <Todo key={todo?.id} id={todo?.id} todo={todo} />
            )
        )}
      </div>
      <div className="my-8">
        <p className="pb-4 dark:text-grey-light">
          Completed -{" "}
          <strong>
            {todos.filter((todo: any) => todo?.completed).length}/{todos.length}
          </strong>
        </p>
        <div className="flex flex-col gap-4 rounded-lg">
          {todos.map(
            (todo: any) =>
              todo?.completed && <Todo key={todo?.id} todo={todo} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
