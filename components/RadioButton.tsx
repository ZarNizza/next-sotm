import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './RadioButton.module.scss'

interface Props
  extends Pick<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'onClick' | 'checked'
  > {
  text: string
}

export function RadioButton(props: Props) {
  return (
    <label className={styles.rb}>
      <input
        type="checkbox"
        onClick={props.onClick}
        className={styles.chk}
        hidden
        checked={props.checked}
      />
      <div className={styles.inputLabel}>{props.text}</div>
    </label>
  )
}
