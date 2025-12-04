# Vending Machine App

## Overview

This is a responsive vending machine web application built with **React + TypeScript**.  
It supports product selection, coin insertion, automatic change calculation, and basic admin CRUD operations.

---

## Features

- **Product Grid** – display up to multiple products with different prices (up to 15 in stock).
- **Coin Insertion** – insert only supported denominations.
- **Automatic Change** – calculates and returns change in coins.
- **Product Selection** – select products by clicking
- **CRUD Operations** – add, remove, restock products in application state.
- **Admin Mode** – toggle admin mode to manage products.
- **Responsive Design** – adapts to desktop and mobile layouts.

---

## Supported Coins

| Coin | Value (€) |
|------|-----------|
| 10c  | 0.1       |
| 20c  | 0.2       |
| 50c  | 0.5       |
| 1    | 1         |
| 2    | 2         |

---

## Installation

```bash
git clone https://github.com/tisho91/vending
cd vending
corepack enable
pnpm install
pnpm dev
pnpm json-server
```


## Usage

- Select a product from the grid
- Insert coins until the inserted amount is enough to purchase.
- Once enough money is inserted, the product is automatically bought.
- Press Take Product and Change to collect your product and get any remaining change.

## Admin Mode

- Toggle admin mode from the checkbox above
- Add new products using the Add Product Card.
- Restock or remove products directly from the product grid.


## Testing

Unit tests are written with Vitest. Run tests with:
```bash
pnpm test
```

## Notes
- Product data is fetched from a mocked API (json-server or any mock endpoint).
- All CRUD operations are handled in application state only (no updates to external API).
- Inserted coins are tracked to calculate change automatically.


## Areas for improvement
- Replace json-server with real one to handle all the CRUD operations 
- Add keypad to create a real life vending machine feeling
- Add a coins storage for the vending machine
- Handle the admin mode better
- Some UI improvements
- More unit test can be added for better coverage