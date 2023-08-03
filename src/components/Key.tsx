type KeyProps = {
  char: string;
  wide?: boolean;
  pressed: string;
};

const Key = ({ char, wide, pressed }: KeyProps) => {
  return (
    <button
      className={
        (wide ? "w-52" : "w-10") +
        " h-10 rounded-lg border border-gray-300 hover:bg-gray-300 hover:text-gray-800 " +
        (pressed === char ? "bg-gray-300 text-gray-800" : "text-gray-300")
      }
    >
      {char}
    </button>
  );
};

export default Key;
