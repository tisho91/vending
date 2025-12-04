import styles from './styles.module.css'
import {useVendingMachine} from "../../../../context/Provider.tsx";
import {ActionTypes} from "../../../../types";


export interface CoinProps {
    value: number;
    label: string;
}

export const Coin = ({value, label}: CoinProps) => {
    const {state, dispatch} = useVendingMachine();
    const disabled = state.adminMode || !!state.boughtProduct
    const insertCoin = () => {
        if (!disabled) {
            dispatch({
                type: ActionTypes.INSERT_COIN, payload: value
            })
        }

    }
    return (
        <div className={styles.coin} onClick={insertCoin}>
            {label}{value < 1 ? '¢' : '€'}
        </div>
    );
};