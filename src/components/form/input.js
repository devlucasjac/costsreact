import styles from "./input.module.css";

function Input({ type, text, name, placeholder, handleOnChenge, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={handleOnChenge}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
