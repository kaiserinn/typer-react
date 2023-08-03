import { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import fetchSentences from "./fetchSentences";

const acceptedInput =
  "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiop[]asdfghjkl;'zxcvbnm,./ ";

function App() {
  const [keys, setKeys] = useState("");
  const [currChar, setCurrChar] = useState("");
  const [showMarker, setShowMarker] = useState(true);
  const [testInput, setTestInput] = useState("");
  const [errorString, setErrorString] = useState("");

  const refresh = async () => {
    fetchSentences(setTestInput);
    setKeys("");
    setErrorString("");
  };

  useEffect(() => {
    fetchSentences(setTestInput);
    const interval = setInterval(() => {
      setShowMarker((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) return;
      if (acceptedInput.includes(e.key)) {
        if (testInput.charAt(0) === e.key && errorString === "") {
          setTestInput((prev) => prev.slice(1, prev.length));
          setKeys((prev) => prev + e.key);
        } else {
          setErrorString((prev) => prev + e.key);
        }
        setCurrChar(e.key);
        setTimeout(() => {
          setCurrChar("");
        }, 100);
      }
      if (e.key === "Backspace") {
        setErrorString(errorString.slice(0, -1));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [keys, testInput, errorString]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-800 font-mono text-gray-300">
      <div className="flex h-full flex-col items-center justify-center gap-12">
        <div
          style={{ overflowWrap: "anywhere" }}
          className="relative mt-auto w-[800px] overflow-hidden whitespace-pre-wrap rounded-lg pl-10 text-2xl"
        >
          <span>{keys}</span>
          <span className="text-red-400">{errorString}</span>
          <span className="absolute">{showMarker ? "_" : " "}</span>
          <span className="text-gray-600">{testInput}</span>
        </div>

        <Keyboard currChar={currChar} />
        <button
          onClick={refresh}
          className="mb-10 mt-auto rounded-md bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
