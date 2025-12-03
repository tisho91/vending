import type {MachineState} from "../types";

export const selectProducts = (state: MachineState) => state.products

export const selectSelectedProduct = (state: MachineState) => {
    return state?.products?.find(product => product.id === state.selectedProductId);
}

export const selectInsertedAmount = (state: MachineState) => {
    let amount = 0;
    Object.keys(state?.insertedCoins || {}).forEach((coin: number) => {
        amount+= state.insertedCoins[coin]* coin
    })
    return amount;
}