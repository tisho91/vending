export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};


export type InsertedCoins = Record<number, number>

export interface MachineState {
    products: Product[]
    selectedProductId: number | null
    insertedCoins: InsertedCoins | null;
    change: InsertedCoins | null;
    boughtProduct?: Product;

}

export const ActionTypes = {
    LOAD_PRODUCTS: "LOAD_PRODUCTS",
    SET_LOADING: "SET_LOADING",
    SELECT_PRODUCT: "SELECT_PRODUCT",
    INSERT_COIN: "INSERT_COIN",
    BUY_PRODUCT: "BUY_PRODUCT",
    TAKE_PRODUCT: "TAKE_PRODUCT",
    RETURN_COINS: "RETURN_COINS",
} as const;

export type Action =
    | { type: typeof ActionTypes.SET_LOADING; payload: boolean }
    | { type: typeof ActionTypes.LOAD_PRODUCTS; payload: Product[] }
    | { type: typeof ActionTypes.SELECT_PRODUCT; payload: number }
    | { type: typeof ActionTypes.INSERT_COIN; payload: number }
    | {
    type: typeof ActionTypes.BUY_PRODUCT; payload: {
        selectedProductId: number;
        change: InsertedCoins;
    }
}
    | { type: typeof ActionTypes.TAKE_PRODUCT }
    | { type: typeof ActionTypes.RETURN_COINS }

