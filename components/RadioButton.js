import styles from "./RadioButton.module.scss";

export function RadioButton(props) {
  // console.log("props=", props);
  return (
    <label className={styles.rb}>
      <input
        type="checkbox"
        onClick={props.handler}
        name={props.name}
        value={props.value}
        className={styles.chk}
        hidden
      />
      <div className={styles.inputLabel}>{props.text}</div>
    </label>
  );
}
