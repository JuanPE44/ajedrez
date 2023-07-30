import { Board } from "./components/Board";
import { BoardContextProvider } from "./context/BoardContext";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </main>
  );
}
