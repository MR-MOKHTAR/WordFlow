import { useTypewriter, Cursor } from "react-simple-typewriter";

type propType = {
  words: string[];
  activeCursor?: boolean;
  loop: boolean;
  className: string;
};

export default function MyTypewriter({
  words,
  activeCursor = true,
  loop,
  className,
}: propType) {
  const [text] = useTypewriter({
    words,
    loop: loop,
    typeSpeed: 120,
    deleteSpeed: 80,
    delaySpeed: 3000,
  });

  return (
    <div className={`${className}`}>
      <span>{text}</span>
      {activeCursor && <Cursor />}
    </div>
  );
}
