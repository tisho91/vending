import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { AddProductCard } from "./index";
import { useVendingMachine } from "../../../context/Provider";

vi.mock("../../../context/Provider", () => ({
    useVendingMachine: vi.fn(),
}));

describe("AddProductCard", () => {
    const dispatchMock = vi.fn();

    beforeEach(() => {
        (useVendingMachine as any).mockReturnValue({
            state: { products: [] },
            dispatch: dispatchMock,
        });
        dispatchMock.mockClear();
    });

    it("should update product fields on input change", () => {
        render(<AddProductCard />);

        const idInput = screen.getByPlaceholderText("Double digits > 10");
        const nameInput = screen.getByPlaceholderText("Name");
        const priceInput = screen.getByPlaceholderText("Price");
        const stockInput = screen.getByPlaceholderText("Stock");

        fireEvent.change(idInput, { target: { value: "12" } });
        fireEvent.change(nameInput, { target: { value: "Cola" } });
        fireEvent.change(priceInput, { target: { value: "1.5" } });
        fireEvent.change(stockInput, { target: { value: "10" } });

        expect((idInput as HTMLInputElement).value).toBe("12");
        expect((nameInput as HTMLInputElement).value).toBe("Cola");
        expect((priceInput as HTMLInputElement).value).toBe("1.5");
        expect((stockInput as HTMLInputElement).value).toBe("10");
    });

    it("should disable add button if product is invalid", () => {
        render(<AddProductCard />);

        const addBtn = screen.getByText("Add") as HTMLButtonElement;
        expect(addBtn.disabled).toBe(true);

        fireEvent.change(screen.getByPlaceholderText("Double digits > 10"), { target: { value: "12" } });
        fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Cola" } });
        fireEvent.change(screen.getByPlaceholderText("Price"), { target: { value: "1.5" } });
        fireEvent.change(screen.getByPlaceholderText("Stock"), { target: { value: "10" } });

        expect(addBtn.disabled).toBe(false);
    });

    it("should call dispatch with ADD_PRODUCT on valid add", () => {
        render(<AddProductCard />);

        fireEvent.change(screen.getByPlaceholderText("Double digits > 10"), { target: { value: "12" } });
        fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Cola" } });
        fireEvent.change(screen.getByPlaceholderText("Price"), { target: { value: "1.5" } });
        fireEvent.change(screen.getByPlaceholderText("Stock"), { target: { value: "10" } });

        const addBtn = screen.getByText("Add");
        fireEvent.click(addBtn);

        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock).toHaveBeenCalledWith({
            type: "ADD_PRODUCT",
            payload: { id: 12, name: "Cola", price: 1.5, stock: 10 },
        });
    });

    it("should set error if price is not multiple of 0.1", () => {
        render(<AddProductCard />);
        const priceInput = screen.getByPlaceholderText("Price");

        fireEvent.change(priceInput, { target: { value: "1.67" } });
        const addBtn = screen.getByText("Add");
        expect(addBtn.disabled).toBe(true);
    });

    it("should set error if id already exists", () => {
        (useVendingMachine as any).mockReturnValue({
            state: { products: [{ id: 12, name: "Existing", price: 1, stock: 5 }] },
            dispatch: dispatchMock,
        });
        render(<AddProductCard />);

        const idInput = screen.getByPlaceholderText("Double digits > 10");
        fireEvent.change(idInput, { target: { value: "12" } });

        const addBtn = screen.getByText("Add");
        expect(addBtn.disabled).toBe(true);
    });
});
