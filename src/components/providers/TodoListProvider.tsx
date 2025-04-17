"use client";
import JSONResponse from "@/lib/json-response";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type TodoListContextType = {
  list: string[];
  createItem: (new_item: string) => Promise<void>;
  updateItem: (index: number, new_value: string) => Promise<void>;
  deleteItem: (index: number) => Promise<void>;
};

const TodoListContext = createContext<TodoListContextType>({
  list: [],
  createItem: async () => {
    return;
  },
  deleteItem: async () => {
    return;
  },
  updateItem: async () => {
    return;
  },
});

export function useTodo() {
  return useContext(TodoListContext);
}

export default function TodoListProvider({ children }: { children: ReactNode }) {
  const [list, setList] = useState<string[]>([]);

  async function createItem(new_item: string) {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }

  async function updateItem(index: number, new_value: string) {
    try {
      const response = await fetch("/api/todo", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: index, content: new_value }),
      });
      const { data, status, message } = (await response.json()) as ReturnType<typeof JSONResponse<string[]>>;

      if (status !== "OK") throw new Error(message!);

      setList(data!);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteItem(index: number) {
    try {
      const response = await fetch("/api/todo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: index }),
      });
      const { data, status, message } = (await response.json()) as ReturnType<typeof JSONResponse<string[]>>;

      if (status !== "OK") throw new Error(message!);

      console.log(data);
      setList(data!);
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
    <TodoListContext.Provider value={{ list, createItem, deleteItem, updateItem }}>{children}</TodoListContext.Provider>
  );
}
