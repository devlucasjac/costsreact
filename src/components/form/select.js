import styles from "./select.module.css";

function Select({ text, name, options, handleOnChenge, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <select name={name} id={name} onChange={handleOnChenge} value={value}>
        <option>Selecione uma opção</option>
        {options.map((option) => (
          <option value={option.nome} id={option.id} key={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
