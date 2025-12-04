import styles from "./styles.module.css";
import {ProductList} from "../Products/ProductList";
import {SidePanel} from "../SidePanel";
import {TakenProductBox} from "../Products/TakenProductBox";
import {useVendingMachine} from "../../context/Provider.tsx";
import {ActionTypes} from "../../types";

export const VendingMachine = () => {

    const {state, dispatch} = useVendingMachine()
    const toggleAdminMode = () => {
        dispatch({
            type: ActionTypes.TOGGLE_ADMIN,
        })
    }

    return (
        <div>
            <div>
                <label htmlFor={'admin'}>Admin mode</label>
                <input id={'admin'} type={'checkbox'} onChange={toggleAdminMode} checked={state.adminMode}></input>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.main}>
                    <ProductList/>
                    <TakenProductBox/>
                </div>
                <div className={styles.side}>
                    <SidePanel/>
                </div>
            </div>
        </div>
    )
}