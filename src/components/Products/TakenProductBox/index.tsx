import styles from './styles.module.css'
import {useVendingMachine} from "../../../context/Provider.tsx";
import {ActionTypes} from "../../../types";


export const TakenProductBox = () => {
    const { state, dispatch } = useVendingMachine();
    const { boughtProduct, change } = state;

    const takeProduct = () =>{
        dispatch({
            type: ActionTypes.TAKE_PRODUCT
        })
    }

    if (!boughtProduct) return null;

    return (
        <div className={styles.takenBox}>
            <span>You took: {boughtProduct.name}</span>
            <button className={styles.takeButton} onClick={takeProduct} >
                Take Product {Object.keys(change || {}).length ? '& Change' : null}
            </button>
        </div>
    );
};
