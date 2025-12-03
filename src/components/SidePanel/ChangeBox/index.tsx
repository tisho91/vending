import styles from './styles.module.css'
import {useVendingMachine} from "../../../context/Provider.tsx";




export const ChangeBox = () => {
    const {state} = useVendingMachine()
    return (
        <div className={styles.changeBox}>
            <h4>Change:</h4>
            <div className={styles.coinsList}>
                {!state.change ? (
                    <span>—</span>
                ) : (
                    Object.entries(state.change).map(([coin, count]) => (
                        <div key={coin} className={styles.coinItem}>
                             {String(count)} × { Number(coin) < 1 ? `${Number(coin)*100}¢` : `${Number(coin)}€` }
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}