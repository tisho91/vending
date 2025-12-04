import type {MachineState} from "../types";

export const selectProducts = (state: MachineState) => state.products

export const selectSelectedProduct = (state: MachineState) => {
    return state?.products?.find(product => product.id === state.selectedProductId);
}

export const selectInsertedAmount = (state: MachineState) => {
    let amount = 0;
    Object.keys(state?.insertedCoins || {}).forEach((coin) => {
        const coinValue = Number(coin);
        amount += Number(state?.insertedCoins?.[coinValue] || 0) * coinValue
    })
    return amount;
}