import {vi} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {ProductItem} from "./index";
import {useVendingMachine} from "../../../context/Provider";
import {ActionTypes} from "../../../types";

vi.mock("../../../context/Provider", () => ({
    useVendingMachine: vi.fn(),
}));

vi.mock('./AdminMode', () => (
    {
        AdminMode: () => (<div>admin panel</div>)
    }
))

describe("ProductItem", () => {
    const dispatchMock = vi.fn();

    beforeEach(() => {
        dispatchMock.mockClear();
    });

    it("renders product info correctly", () => {
        (useVendingMachine as any).mockReturnValue({
            state: {adminMode: false, boughtProduct: null},
            dispatch: dispatchMock,
        });

        render(<ProductItem id={12} name="Cola" price={1.5} stock={5}/>);

        expect(screen.getByText("12")).toBeInTheDocument();
        expect(screen.getByText("Cola")).toBeInTheDocument();
        expect(screen.getByText("1.50 €")).toBeInTheDocument();
    });

    it("applies disabled class if out of stock", () => {
        (useVendingMachine as any).mockReturnValue({
            state: {adminMode: false, boughtProduct: null},
            dispatch: dispatchMock,
        });

        const {container} = render(<ProductItem id={12} name="Cola" price={1.5} stock={0}/>);
        expect(container.firstChild).toHaveClass(/disabled/);
    });

    it("dispatches SELECT_PRODUCT when clicked if enabled", () => {
        (useVendingMachine as any).mockReturnValue({
            state: {adminMode: false, boughtProduct: null},
            dispatch: dispatchMock,
        });

        render(<ProductItem id={12} name="Cola" price={1.5} stock={5}/>);

        fireEvent.click(screen.getByText("Cola"));
        expect(dispatchMock).toHaveBeenCalledWith({
            type: ActionTypes.SELECT_PRODUCT,
            payload: 12,
        });
    });

    it("does not dispatch if disabled (stock 0)", () => {
        (useVendingMachine as any).mockReturnValue({
            state: {adminMode: false, boughtProduct: null},
            dispatch: dispatchMock,
        });

        render(<ProductItem id={12} name="Cola" price={1.5} stock={0}/>);

        fireEvent.click(screen.getByText("Cola"));
        expect(dispatchMock).not.toHaveBeenCalled();
    });

    it("renders AdminMode when in adminMode", () => {
        (useVendingMachine as any).mockReturnValue({
            state: {adminMode: true, boughtProduct: null},
            dispatch: dispatchMock,
        });

        render(<ProductItem id={12} name="Cola" price={1.5} stock={5}/>);
        expect(screen.getByText("admin panel")).toBeInTheDocument();
    });
});
