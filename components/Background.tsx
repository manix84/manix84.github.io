import st from "./Background.module.scss";

const Background = () => {
  return (
    <>
      <div className={st.container}>
        <div className={st.overlay} />
        <div className={st.element} />
      </div>
    </>
  );
};
export default Background;
