import { useRef, useEffect, useState } from "react";
import Style from "styles/app/index.module.scss";
export default function ModFind({ find, setFind, loading }) {
  const inputRef = useRef();
  const [isFocus, setIsFocus] = useState(false);
  const focusMe = () => {
    const { current } = inputRef;
    setIsFocus(current === document.activeElement);
  };
  useEffect(() => {
    document.addEventListener("click", focusMe);
    return () => {
      document.addEventListener("click", focusMe);
    };
  }, []);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <input
        ref={inputRef}
        value={find}
        onChange={e => setFind(e.target.value)}
        type="text"
        placeholder="ابحث عن درس..."
        className={loading ? Style.loading : isFocus ? Style.focus : "none"}
      />
    </form>
  );
}
