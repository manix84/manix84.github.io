import { useEffect, useRef } from "react";
import st from "./Background.module.scss";

const Background = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;

      (elementRef.current as HTMLDivElement).animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 7000, fill: "forwards" }
      );
    };
    window.addEventListener("pointermove", pointerMove);
    return () => window.removeEventListener("pointermove", pointerMove);
  }, []);

  return (
    <>
      <div className={st.container}>
        <div className={st.overlay} />
        <div className={st.element} ref={elementRef} />
      </div>
    </>
  );
};
export default Background;
