import {vi} from "vitest";
import {renderHook, waitFor} from "@testing-library/react";
import {useLoadProducts} from "./index.tsx";
import {useVendingMachine} from "../../context/Provider.tsx";
import {ActionTypes} from "../../types";

vi.mock("../../context/Provider.tsx", () => ({
    useVendingMachine: vi.fn(),
}));

vi.mock("../../handlers", () => ({
    fetchProducts: vi.fn(),
}));

const fetchProductsMock = vi.fn();

vi.mock('../../handlers', () => ({
    fetchProducts: () => fetchProductsMock(),
}))
describe("useLoadProducts", () => {
    const dispatchMock = vi.fn();


    beforeEach(() => {
        dispatchMock.mockClear();
        fetchProductsMock.mockClear();
        (useVendingMachine as any).mockReturnValue({
            state: {},
            dispatch: dispatchMock,
        });
    });

    it("should call dispatch with loaded products", async () => {
        const mockProducts = [
            {id: 1, name: "Cola", price: 1.5, stock: 5},
            {id: 2, name: "Fanta", price: 1.2, stock: 3},
        ];
        fetchProductsMock.mockResolvedValueOnce(mockProducts);

        renderHook(() => useLoadProducts());

        await waitFor(() => expect(dispatchMock).toHaveBeenCalledWith({
            type: ActionTypes.LOAD_PRODUCTS,
            payload: mockProducts,
        }));

    });

    it("should not call dispatch if unmounted before fetch resolves", async () => {
        const mockProducts = [{id: 1, name: "Cola", price: 1.5, stock: 5}];
        fetchProductsMock.mockImplementation(
            () => new Promise(resolve => setTimeout(() => resolve(mockProducts), 50))
        );

        const {unmount} = renderHook(() => useLoadProducts());
        unmount();

        await new Promise(resolve => setTimeout(resolve, 60));

        expect(dispatchMock).not.toHaveBeenCalled();
    });
});
