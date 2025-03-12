import Image from "next/image";
import Messages from "@/components/Message/Message";
import Form from "@/components/Form/Form";
import Board from "@/components/Board/Board";

export default function Home() {
  return (
    <div className="main_container">
      <Board></Board>
    </div>
  );
}