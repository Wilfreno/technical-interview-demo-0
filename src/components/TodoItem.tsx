import { useState } from "react";
import { useTodo } from "./providers/TodoListProvider";

export default function TodoItem({ content, index }: { content: string; index: number }) {
  const [new_value, setNewValue] = useState(content);
  const [edit, setEdit] = useState(false);

  const { updateItem, deleteItem } = useTodo();

  return (
    <div className="w-full flex gap-2 items-center">
      <input
        disabled={!edit}
        value={edit ? new_value : content}
        className={"rounded w-full p-2 " + `${edit ? "border" : "bg-gray-100/10"}`}
        onChange={(e) => setNewValue(e.target.value)}
      />
      {edit ? (
        <button
          type="button"
          className="rounded p-2 bg-blue-400 cursor-pointer hover:bg-blue-400/80"
          onClick={async () => {
            await updateItem(index, new_value);
            setEdit(false);
          }}
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
            onClick={() => deleteItem(index)}
          >
            remove
          </button>
        </>
      )}
    </div>
  );
}
