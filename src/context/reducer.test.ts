import { reducer, initialState } from "./reducer";
import { ActionTypes, type Product } from "../types";

const mockProducts: Product[] = [
    { id: 1, name: "Cola", price: 1.5, stock: 10 },
    { id: 2, name: "Water", price: 1.0, stock: 5 },
];

describe("Vending Machine Reducer", () => {

    it("should load products", () => {
        const state = reducer(initialState, {
            type: ActionTypes.LOAD_PRODUCTS,
            payload: mockProducts,
        });

        expect(state.products).toEqual(mockProducts);
    });

    it("should select a product", () => {
        const state = reducer(initialState, {
            type: ActionTypes.SELECT_PRODUCT,
            payload: 2,
        });

        expect(state.selectedProductId).toBe(2);
    });

    it("should insert coin", () => {
        const state = reducer(initialState, {
            type: ActionTypes.INSERT_COIN,
            payload: 1,
        });

        expect(state.insertedCoins).toEqual({ 1: 1 });
    });

    it("should buy product - update stock, set change, store bought product", () => {
        const stateWithProducts = { ...initialState, products: mockProducts };

        const action = {
            type: ActionTypes.BUY_PRODUCT,
            payload: {
                selectedProductId: 1,
                change: { 1: 1 },
            },
        };

        const state = reducer(stateWithProducts, action);

        expect(state.products[0].stock).toBe(9);
        expect(state.change).toEqual({ 1: 1 });
        expect(state.selectedProductId).toBe(null);
        expect(state.insertedCoins).toBe(null);
        expect(state.boughtProduct?.id).toBe(1);
    });

    it("should return coins (no purchase)", () => {
        const state = reducer(
            { ...initialState, insertedCoins: { 1: 2 } },
            { type: ActionTypes.RETURN_COINS }
        );

        expect(state.change).toEqual({ 1: 2 });
        expect(state.insertedCoins).toBe(null);
    });

    it("should toggle admin mode", () => {
        const state = reducer(initialState, { type: ActionTypes.TOGGLE_ADMIN });

        expect(state.adminMode).toBe(true);
    });

    it("should restock product", () => {
        const state = reducer(
            { ...initialState, products: mockProducts },
            { type: ActionTypes.RESTOCK_PRODUCT, payload: 2 }
        );

        const product = state.products.find(p => p.id === 2);
        expect(product?.stock).toBe(15);
    });

    it("should remove a product", () => {
        const state = reducer(
            { ...initialState, products: mockProducts },
            { type: ActionTypes.REMOVE_PRODUCT, payload: 1 }
        );

        expect(state.products.length).toBe(1);
        expect(state.products[0].id).toBe(2);
    });

    it("should add a product", () => {
        const newProduct: Product = {
            id: 3,
            name: "Snack",
            price: 2.0,
            stock: 7,
        };

        const state = reducer(
            { ...initialState, products: mockProducts },
            { type: ActionTypes.ADD_PRODUCT, payload: newProduct }
        );

        expect(state.products.length).toBe(3);
        expect(state.products[2]).toEqual(newProduct);
    });

    it("should reset state except products/admin after taking product", () => {
        const customState = {
            ...initialState,
            products: mockProducts,
            adminMode: true,
        };

        const state = reducer(customState, { type: ActionTypes.TAKE_PRODUCT });

        expect(state.products).toEqual(mockProducts);
        expect(state.adminMode).toBe(true);
        expect(state.insertedCoins).toBe(null);
        expect(state.selectedProductId).toBe(null);
    });
});
