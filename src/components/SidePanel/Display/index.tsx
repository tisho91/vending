import styles from './styles.module.css'
import {useVendingMachine} from "../../../context/Provider.tsx";
import {selectInsertedAmount, selectSelectedProduct} from "../../../context/selectors.ts";

export const Display = () =>{
    const {state} = useVendingMachine();
    const selectedProduct = selectSelectedProduct(state)
    const insertedAmount = selectInsertedAmount(state)

    return (
        <div className={styles.display}>
            <div className={styles.line}>
                {selectedProduct
                    ? `Selected: ${selectedProduct.name}`
                    : "Select product"}
            </div>
            <div className={styles.line}>
                {(insertedAmount || 0)?.toFixed(2)} € inserted
            </div>
        </div>
    )
}