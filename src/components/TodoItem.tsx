import JSONResponse from "@/lib/json-response";
import { Dispatch, SetStateAction, useState } from "react";

export default function TodoItem({
  content,
  index,
  setList,
}: {
  content: string;
  index: number;
  setList: Dispatch<SetStateAction<string[]>>;
}) {
  const [new_value, setNewValue] = useState(content);
  const [edit, setEdit] = useState(false);

  async function updateItem() {
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
    } finally {
      setEdit(false);
    }
  }

  async function deleteItem() {
    try {
      console.log(index);
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

  return (
    <div className="w-full flex gap-2 items-center">
      <input
        disabled={!edit}
        value={new_value}
        className={"rounded w-full p-2 " + `${edit ? "border" : "bg-gray-100/10"}`}
        onChange={(e) => setNewValue(e.target.value)}
      />
      {edit ? (
        <button
          type="button"
          className="rounded p-2 bg-blue-400 cursor-pointer hover:bg-blue-400/80"
          onClick={updateItem}
        >
          done
        </button>
      ) : (
        <>
          <button
            type="button"
            className="rounded p-2 bg-blue-400 cursor-pointer hover:bg-blue-400/80"
            onClick={() => setEdit(true)}
          >
            edit
          </button>
          <button
            type="button"
            className="rounded p-2 bg-red-500 cursor-pointer hover:bg-red-500/80"
            onClick={deleteItem}
          >
            remove
          </button>
        </>
      )}
    </div>
  );
}
