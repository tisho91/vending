import styles from './styles.module.css'
import {useVendingMachine} from "../../../context/Provider.tsx";
import {ActionTypes} from "../../../types";

export const ResetButton = () => {
    const {state, dispatch} = useVendingMachine();
    const disabled = Object.keys(state.insertedCoins || {}).length === 0 || !!state.boughtProduct
    const reset = () => {
        if (disabled) {
            return;
        }
        dispatch({
            type: ActionTypes.RETURN_COINS
        })
    }

    return (
        <button
            className={styles.resetButton}
            disabled={disabled}
            onClick={reset}
        >
            Return Coins
        </button>
    )
}