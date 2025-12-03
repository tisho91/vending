import styles from './styles.module.css'

const keypadNumbers = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "", "0", ""
];


export const Keypad = () => {
    return (
        <div className={styles.keypad}>
            {keypadNumbers.map((num, idx) => (
                <button
                    key={num || `empty-${idx}`}
                    className={styles.key}
                >
                    {num}
                </button>
            ))}
        </div>
    )
}