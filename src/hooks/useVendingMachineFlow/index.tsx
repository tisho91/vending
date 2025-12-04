import {useVendingMachine} from "../../context/Provider.tsx";
import {ActionTypes} from "../../types";
import {selectInsertedAmount, selectSelectedProduct} from "../../context/selectors.ts";
import {useEffect} from "react";
import {calculateChangeCoins} from "../../utils";

export const useVendingMachineFlow = () => {
    const {state, dispatch} = useVendingMachine();
    const selectedProduct = selectSelectedProduct(state);
    const insertedAmount = selectInsertedAmount(state)

    useEffect(() => {
        if (!insertedAmount || !selectedProduct) return;
        if (insertedAmount < selectedProduct.price) return;
        const change = calculateChangeCoins(insertedAmount - selectedProduct.price);
        dispatch({
            type: ActionTypes.BUY_PRODUCT,
            payload: {
                selectedProductId: selectedProduct.id,
                change
            }
        })

    }, [dispatch, insertedAmount, selectedProduct])
}