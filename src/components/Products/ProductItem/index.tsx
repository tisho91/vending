import {useVendingMachine} from "../../../context/Provider";
import {ActionTypes, type Product} from "../../../types";
import styles from './styles.module.css'
import {AdminMode} from "./AdminMode.tsx";

export const ProductItem = ({
                                name,
                                price,
                                stock,
                                id
                            }: Product) => {
    const {state, dispatch} = useVendingMachine();
    const disabled = (!stock || !!state.boughtProduct)
    const selectProduct = () => {
        if (!disabled && !state.adminMode) {
            dispatch({type: ActionTypes.SELECT_PRODUCT, payload: id})
        }
    }

    return (
        <div className={`${styles.item} ${disabled && styles.disabled}`} onClick={selectProduct}>
            <div className={styles.code}>{id}</div>
            <div className={styles.name}>{name}</div>
            <div className={styles.footer}>
                <span className={styles.price}>{stock ? `${price.toFixed(2)} €` : 'out of stock'}</span>
            </div>
            {
                state.adminMode ? <AdminMode stock={stock} id={id}/> : null
            }
        </div>
    );
};
