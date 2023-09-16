import st from "./Footer.module.css";

const Footer = () => (
  <footer className={st.footer}>&copy; {new Date().getFullYear()}</footer>
);
export default Footer;
