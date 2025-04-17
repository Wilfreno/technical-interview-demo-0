import JSONResponse from "@/lib/json-response";
import { Todo, ToDoType } from "@/lib/models/Todo";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { content } = (await request.json()) as Partial<ToDoType>;

    if (!content)
      return NextResponse.json(JSONResponse("BAD_REQUEST", "content field must exist on the request body"), {
        status: 400,
      });

    const new_todo = new Todo(content);

    new_todo.save();
    console.log(Todo.list);
    return NextResponse.json(JSONResponse("CREATED", "new todo has been created", Todo.list), { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(JSONResponse("CREATED", error as string), { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(JSONResponse("OK", "request successful", Todo.list), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(JSONResponse("CREATED", error as string), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, content } = (await request.json()) as ToDoType;

    if (!id)
      return NextResponse.json(JSONResponse("BAD_REQUEST", "id field is required on the request body"), {
        status: 400,
      });

    if (!content)
      return NextResponse.json(JSONResponse("BAD_REQUEST", "content field is required on the request body"), {
        status: 400,
      });

    Todo.update(id, content);

    return NextResponse.json(JSONResponse("OK", "todo element updated", Todo.list), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(JSONResponse("CREATED", error as string), { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = (await request.json()).id;

    if (id === undefined)
      return NextResponse.json(JSONResponse("BAD_REQUEST", "id field is must exist on the request body "));

    Todo.delete(id);
    return NextResponse.json(JSONResponse("OK", "todo item deleted", Todo.list), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(JSONResponse("INTERNAL_SERVER_ERROR", error as string), { status: 500 });
  }
}
