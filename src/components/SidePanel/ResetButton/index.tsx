import styles from './styles.module.css'

export const ResetButton = () => {
    return (
        <button
            className={styles.resetButton}
            // disabled={state.insertedAmount === 0}
        >
            Return Coins
        </button>
    )
}