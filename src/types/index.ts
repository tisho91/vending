export type CoinType = {
    value: number;
    label: string;
}

export type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};

export interface MachineState {
    products: Product[]
    loading: boolean
    selectedProduct?: Product
    insertedAmount?: number;
    lastTakenProduct?: Product
}

export const ActionTypes = {
    LOAD_PRODUCTS: "LOAD_PRODUCTS",
    SET_LOADING: "SET_LOADING",
} as const;

export type Action =
    | { type: typeof ActionTypes.SET_LOADING; payload: boolean }
    | { type: typeof ActionTypes.LOAD_PRODUCTS; payload: Product[] };