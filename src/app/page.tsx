"use client";

import { useState } from "react";
import TodoItem from "../components/TodoItem";
import { useTodo } from "@/components/providers/TodoListProvider";

export default function Home() {
  const [new_item, setNewItem] = useState("");

  const { list, createItem } = useTodo();

  return (
    <main className="flex flex-col items-center gap-10 p-10 h-dvh">
      <h1 className="text-5xl font-semibold">Todo App</h1>
      <form
        className="flex flex-col items-center w-1/3 gap-10"
        onSubmit={async (event) => {
          event.preventDefault();
          await createItem(new_item);
          setNewItem("");
        }}
      >
        <div className="w-full flex justify-center gap-4">
          <input
            placeholder="Input todo"
            value={new_item}
            className="rounded-lg border w-full p-2"
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            type="submit"
            disabled={!new_item}
            className="border bg-gray-400 hover:bg-gray-400 p-2 rounded cursor-pointer disabled:cursor-default"
          >
            add
          </button>
        </div>

        <div className="grid gap-4 w-full max-h-[70dvh] overflow-y-auto p-2">
          {list.map((content, index) => (
            <TodoItem key={index} content={content} index={index} />
          ))}
        </div>
      </form>
    </main>
  );
}
