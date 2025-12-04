import styles from './styles.module.css'
import {useVendingMachine} from "../../../context/Provider.tsx";
import {ActionTypes} from "../../../types";
import {useMemo} from "react";


export const TakenProductBox = () => {
    const {state, dispatch} = useVendingMachine();
    const {boughtProduct, change} = state;

    const takeProduct = () => {
        dispatch({
            type: ActionTypes.TAKE_PRODUCT
        })
    }


    const buttonLabel = useMemo(() => {
        let label = `Take`
        if (boughtProduct) {
            label += ' Product'
        }
        if (Object.keys(change || {}).length) {
            label += `${boughtProduct ? ' &' : ''} Change`
        }
        return label
    }, [boughtProduct, change])

    if (!boughtProduct && !Object.keys(change || {}).length) return null;
    return (
        <div className={styles.takenBox}>
            {
                boughtProduct && (<span>You took: {boughtProduct.name}</span>)
            }

            <button className={styles.takeButton} onClick={takeProduct}>
                {buttonLabel}
            </button>
        </div>
    );
};
