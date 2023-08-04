type TextDisplayProps = {
  inputtedString: string;
  errorString: string;
  testString: string;
};

const TextDisplay = ({
  inputtedString,
  errorString,
  testString,
}: TextDisplayProps) => {
  return (
    <div
      style={{ overflowWrap: "anywhere" }}
      className="relative mt-auto w-[800px] overflow-hidden whitespace-pre-wrap rounded-lg pl-10 text-2xl"
    >
      <span>{inputtedString}</span>
      <span className="whitespace-pre-wrap text-red-400">{errorString}</span>
      <span className="cursor text-gray-600">{testString}</span>
    </div>
  );
};

export default TextDisplay;
