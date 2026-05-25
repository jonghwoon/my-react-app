import styles from "./Button.module.css";

interface IButtonProps {
  text: string;
}

function Button({ text }: IButtonProps) {
  return <button className={styles.btn}>{text}</button>;
}

export default Button;
