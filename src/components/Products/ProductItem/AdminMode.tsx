import styles from './styles.module.css';
import {ActionTypes} from "../../../types";
import {useVendingMachine} from "../../../context/Provider.tsx";

export const AdminMode = ({id, stock}: { id: number, stock: number }) => {
    const {dispatch} = useVendingMachine()

    const deleteProduct = () => {
        dispatch({
            type: ActionTypes.REMOVE_PRODUCT,
            payload: id
        })
    }

    const restock = () => {
        dispatch({
            type: ActionTypes.RESTOCK_PRODUCT,
            payload: id
        })
    }
    return (
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
            <button
                className={styles.actionBtn}
                onClick={deleteProduct}
            >
                Remove Item
            </button>
            {
                !stock ? <button
                    className={styles.actionBtn}
                    onClick={restock}
                >
                    Restock
                </button> : null
            }

        </div>
    );
};
