import {vi} from "vitest";
import {renderHook} from "@testing-library/react";
import {useVendingMachineFlow} from "./index.tsx";
import {useVendingMachine} from "../../context/Provider.tsx";
import {ActionTypes} from "../../types";
import * as selectors from "../../context/selectors";
import * as utils from "../../utils";

vi.mock("../../context/Provider.tsx", () => ({
    useVendingMachine: vi.fn(),
}));

describe("useVendingMachineFlow", () => {
    const dispatchMock = vi.fn();

    beforeEach(() => {
        dispatchMock.mockClear();
    });

    it("does not dispatch if no product is selected or no coins inserted", () => {
        (useVendingMachine as any).mockReturnValue({
            state: {insertedCoins: null, selectedProductId: null, products: []},
            dispatch: dispatchMock,
        });

        vi.spyOn(selectors, "selectInsertedAmount").mockReturnValue(0);
        vi.spyOn(selectors, "selectSelectedProduct").mockReturnValue(null);

        renderHook(() => useVendingMachineFlow());

        expect(dispatchMock).not.toHaveBeenCalled();
    });

    it("does not dispatch if inserted amount is less than product price", () => {
        const product = {id: 1, name: "Cola", price: 1.5, stock: 5};
        (useVendingMachine as any).mockReturnValue({
            state: {},
            dispatch: dispatchMock,
        });

        vi.spyOn(selectors, "selectInsertedAmount").mockReturnValue(1.0);
        vi.spyOn(selectors, "selectSelectedProduct").mockReturnValue(product);

        renderHook(() => useVendingMachineFlow());

        expect(dispatchMock).not.toHaveBeenCalled();
    });

    it("dispatches BUY_PRODUCT with correct change when enough money is inserted", () => {
        const product = {id: 1, name: "Cola", price: 1.5, stock: 5};
        (useVendingMachine as any).mockReturnValue({
            state: {},
            dispatch: dispatchMock,
        });

        vi.spyOn(selectors, "selectInsertedAmount").mockReturnValue(2.0);
        vi.spyOn(selectors, "selectSelectedProduct").mockReturnValue(product);

        vi.spyOn(utils, "calculateChangeCoins").mockReturnValue({"0.5": 1});

        renderHook(() => useVendingMachineFlow());

        expect(dispatchMock).toHaveBeenCalledWith({
            type: ActionTypes.BUY_PRODUCT,
            payload: {
                selectedProductId: 1,
                change: {"0.5": 1},
            },
        });
    });
});
