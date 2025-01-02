export function formatCurrency(
    amount: number,
    currencyCode: string = "SEK"
): string {
    try {
        return new Intl.NumberFormat("en-SE", {
            style: "currency",
            currency: currencyCode.toUpperCase(), // Corrected placement of toUpperCase
        }).format(amount);
    } catch (error) {
        console.error("Invalid currency code", currencyCode, error);
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`;
    }
}
