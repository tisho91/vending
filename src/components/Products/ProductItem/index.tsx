import {useVendingMachine} from "../../../context/Provider";
import {ActionTypes, type Product} from "../../../types";
import styles from './styles.module.css'

export const ProductItem = ({
                                name,
                                price,
                                stock,
                                id
                            }: Product) => {
    const {state, dispatch} = useVendingMachine();
    const selectProduct = () => {
        if (stock && !state.boughtProduct) {
            dispatch({type: ActionTypes.SELECT_PRODUCT, payload: id})
        }
    }
    return (
        <div className={styles.item} onClick={selectProduct}>
            <div className={styles.code}>{id}</div>
            <div className={styles.name}>{name}</div>
            <div className={styles.footer}>
                <span className={styles.price}>{stock ? `${price.toFixed(2)} €` : 'out of stock'}</span>
            </div>
        </div>
    );
};
