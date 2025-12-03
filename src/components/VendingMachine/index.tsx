import styles from "./styles.module.css";
import {ProductList} from "../Products/ProductList";
import {SidePanel} from "../SidePanel";
import {TakenProductBox} from "../Products/TakenProductBox";

export const VendingMachine = () =>{


    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <ProductList/>
                <TakenProductBox/>
            </div>
            <div className={styles.side}>
                <SidePanel/>
            </div>
        </div>
    )
}