"use client";

import { FormEvent, useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import JSONResponse from "@/lib/json-response";

export default function Home() {
  const [list, setList] = useState<string[]>([]);
  const [new_item, setNewItem] = useState("");

  async function createItem(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const response = await fetch("/api/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: new_item }),
      });
      const { data, status, message } = (await response.json()) as ReturnType<typeof JSONResponse<string[]>>;

      if (status !== "CREATED") throw new Error(message!);

      setList(data!);
      setNewItem("");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getList() {
      try {
        const response = await fetch("/api/todo");
        const { data, status, message } = (await response.json()) as ReturnType<typeof JSONResponse<string[]>>;

        if (status !== "OK") throw new Error(message!);

        setList(data!);
      } catch (error) {
        console.error(error);
      }
    }
    getList();
  }, []);

  return (
    <main className="flex flex-col items-center gap-10 p-10 h-dvh">
      <h1 className="text-5xl font-semibold">Todo App</h1>
      <form className="flex flex-col items-center w-1/3 gap-10" onSubmit={createItem}>
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
            <TodoItem key={index} content={content} index={index} setList={setList} />
          ))}
        </div>
      </form>
    </main>
  );
}
