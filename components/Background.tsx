import { useEffect, useRef } from "react";
import st from "./Background.module.scss";

const Background = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.onpointermove = (event) => {
      const { clientX, clientY } = event;

      (elementRef.current as HTMLDivElement).animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: "forwards" }
      );
    };
  }, []);

  return (
    <>
      <div className={st.overlay} />
      <div className={st.element} ref={elementRef} />
    </>
  );
};
export default Background;
