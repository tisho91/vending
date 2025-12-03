import styles from './styles.module.css'
import {useVendingMachine} from "../../../context/Provider.tsx";

export const Display = () =>{
    const {state} = useVendingMachine();
    return (
        <div className={styles.display}>
            <div className={styles.line}>
                {state.selectedProduct
                    ? `Selected: ${state.selectedProduct.name}`
                    : "Select product"}
            </div>
            <div className={styles.line}>
                {(state.insertedAmount || 0)?.toFixed(2)} € inserted
            </div>
        </div>
    )
}