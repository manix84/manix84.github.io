import { useEffect, useRef } from "react";
import st from "./Background.module.scss";

const Background = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;

      (elementRef.current as HTMLDivElement).animate(
        {
          left: `${clientX + scrollX}px`,
          top: `${clientY + scrollY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };
    window.addEventListener("pointermove", pointerMove);
    return () => window.removeEventListener("pointermove", pointerMove);
  }, []);

  return (
    <>
      <div className={st.overlay} />
      <div className={st.element} ref={elementRef} />
    </>
  );
};
export default Background;
