import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <TodoInput />
      <TodoList />
    </div>
  );
}

