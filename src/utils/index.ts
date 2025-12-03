export const calculateChangeCoins = (amount: number) => {
    const COINS = [2, 1, 0.5, 0.2, 0.1]; // ред от голямо към малко
    const result: Record<string, number> = {};

    let remaining = Math.round(amount * 100) / 100;

    for (const coin of COINS) {
        const count = Math.floor(remaining / coin);
        if (count > 0) {
            result[coin.toString()] = count;
            remaining = Math.round((remaining - coin * count) * 100) / 100;
        }
    }

    return result;
};