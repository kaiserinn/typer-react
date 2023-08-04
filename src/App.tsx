import { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import fetchSentences from "./fetchSentences";
import TextDisplay from "./components/TextDisplay";

const acceptedInput =
  "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiop[]asdfghjkl;'zxcvbnm,./- ";

function App() {
  const [inputtedString, setInputtedString] = useState("");
  const [testString, setTestString] = useState("");
  const [errorString, setErrorString] = useState("");
  const [currChar, setCurrChar] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);

  const refresh = async () => {
    setTestString(await fetchSentences());
    setInputtedString("");
    setErrorString("");
    setStartTime(0);
    setWpm(0);
  };

  useEffect(() => {
    fetchSentences().then((data) => setTestString(data));
  }, []);

  useEffect(() => {
    const calculateWPM = () => {
      const wordAmount = inputtedString.split(" ").length;
      setWpm(
        Math.round(
          wordAmount / ((new Date().getTime() - startTime) / 1000 / 60),
        ),
      );
      setStartTime(0);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey) return;
      if (acceptedInput.includes(e.key)) {
        if (testString.charAt(0) === e.key && !errorString && testString) {
          if (startTime === 0) {
            const start = new Date().getTime();
            setStartTime(start);
            console.log("timer starts: " + new Date().getTime());
          }
          setTestString((prev) => {
            if (prev.slice(1, prev.length) === "") {
              calculateWPM();
            }
            return prev.slice(1, prev.length);
          });
          setInputtedString((prev) => prev + e.key);
        } else if (testString !== "") {
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
  }, [inputtedString, testString, errorString, startTime]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-800 font-mono text-gray-300">
      <div className="flex h-full flex-col items-center justify-center gap-12">
        <div className="mt-6 text-center text-5xl">
          {wpm ? wpm + " WPM" : " "}
        </div>

        <TextDisplay
          inputtedString={inputtedString}
          errorString={errorString}
          testString={testString}
        />

        <Keyboard currChar={currChar} />

        <button
          onClick={refresh}
          tabIndex={-1}
          className="mb-10 mt-auto rounded-md bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
