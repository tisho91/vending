import {Coin, type CoinProps} from "./Coin";
import styles from './styles.module.css'
const coinsList:CoinProps[] =[
    {value: 0.1, label: '10'},
    {value: 0.2, label: '20'},
    {value: 0.5, label: '50'},
    {value: 1, label: '1'},
    {value: 2, label: '2'}
]

export const Coins = () =>{

    return (
        <div className={styles.coinsWrapper}>
            {
                coinsList.map((coin) => {
                    return (
                        <Coin {...coin} key={coin.value}/>
                    )
                })
            }
        </div>
    )
}