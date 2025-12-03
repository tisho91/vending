import styles from './styles.module.css'
import {useVendingMachine} from "../../../context/Provider.tsx";


export const TakenProductBox = () => {
    const { state } = useVendingMachine();
    // const { lastTakenProduct } = state;
const lastTakenProduct = state.products[0]

    if (!lastTakenProduct) return null;

    return (
        <div className={styles.takenBox}>
            <span>You took: {lastTakenProduct.name}</span>
            <button className={styles.takeButton} >
                Take Product & Change
            </button>
        </div>
    );
};
