import Key from "./Key";

const firstRow = "qwertyuiop[]";
const secondRow = "asdfghjkl;'";
const thirdRow = "zxcvbnm,./";

const Keyboard = ({ currChar }: { currChar: string }) => {
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex justify-center gap-2">
        {[...firstRow].map((char) => (
          <Key char={char} pressed={currChar} />
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {[...secondRow].map((char) => (
          <Key char={char} pressed={currChar} />
        ))}
      </div>
      <div className="flex justify-center gap-2">
        {[...thirdRow].map((char) => (
          <Key char={char} pressed={currChar} />
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <Key char="__" wide={true} pressed={currChar} />
      </div>
    </div>
  );
};

export default Keyboard;
