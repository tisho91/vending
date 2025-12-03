import type {Product} from "../../../types";
import styles from './styles.module.css'

export const ProductItem = ({
                                name,
                                price,
                                stock,
                                id
                            }: Product) => {
    return (
        <div className={styles.item}>
            <div className={styles.code}>{id}</div>
            <div className={styles.name}>{name}</div>
            <div className={styles.footer}>
                  <span className={styles.price}>{stock? `${price.toFixed(2)} €` : 'out of stock'}</span>
            </div>
        </div>
    );
};
