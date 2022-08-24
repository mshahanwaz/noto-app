import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import Todo from "./Todo";

const todosList = [
  {
    id: 1,
    title: "TTodo 1Todo 1Todo 1Todo 1Todo 1Todo 1Todo 1Todo 1odo 1",
    completed: false,
    createdAt: 1661146600000,
  },
  {
    id: 2,
    title: "Todo 2",
    completed: true,
    createdAt: 1661346609618,
  },
  {
    id: 3,
    title: "Todo 3",
    completed: false,
    createdAt: 1661347607618,
  },
  {
    id: 4,
    title: "Todo 4",
    completed: true,
    createdAt: 1661346609618,
  },
  {
    id: 5,
    title: "Todo 5",
    completed: false,
    createdAt: 1661347607618,
  },
];

const Todos = () => {
  const [todos, setTodos] = React.useState(todosList);

  return (
    <div className="">
      <div className="flex items-center justify-center gap-4 p-4 border-2 text-lg font-medium text-slate-400 border-dashed hover:border-solid border-slate-400 cursor-pointer rounded-xl">
        <PlusIcon width={24} />
        <p>Add todo</p>
      </div>
      <div className="my-8 flex flex-col gap-4 overflow-y-auto h-[200px] rounded-lg">
        {todos.map(
          (todo) =>
            !todo.completed && (
              <Todo key={todo.id} todo={todo} setTodos={setTodos} />
            )
        )}
      </div>
      <div className="my-8">
        <p className="pb-4">
          Completed - {todos.filter((todo) => todo.completed).length}/
          {todos.length}
        </p>
        <div className="flex flex-col gap-4 overflow-y-auto h-[200px] rounded-lg">
          {todos.map(
            (todo) =>
              todo.completed && (
                <Todo key={todo.id} todo={todo} setTodos={setTodos} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
