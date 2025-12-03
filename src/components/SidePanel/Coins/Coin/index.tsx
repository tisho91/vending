import styles from './styles.module.css'


export interface CoinProps {
    value: number;
    label: string;
}

export const Coin = ({value, label}: CoinProps) => {

    return (
        <div className={styles.coin}>
            {label}{value < 1 ? '¢' : '€'}
        </div>
    );
};