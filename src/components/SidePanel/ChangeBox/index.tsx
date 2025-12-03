import styles from './styles.module.css'

export const ChangeBox = () => {
    const  change =  {}

    return (
        <div className={styles.changeBox}>
            <h4>Change:</h4>
            <div className={styles.coinsList}>
                {Object.keys(change || {}).length === 0 ? (
                    <span>—</span>
                ) : (
                    Object.entries(change).map(([coin, count]) => (
                        <div key={coin} className={styles.coinItem}>
                            {coin} × {String(count)}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}