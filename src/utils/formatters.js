export function formatPriceTag(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return '';

    // clean the input for any non-digit values.
    let price = value.replace(/[^\d]/g, '');

    // priceLength is used to know when to apply our formatting for the price
    const priceLength = price.length;

    if (priceLength < 4) return `¢${price}`;

    if (priceLength < 5) return `¢${price.slice(0, 1)},${price.slice(1)}`
    if (priceLength < 6) return `¢${price.slice(0, 2)},${price.slice(2)}`
    if (priceLength < 7) return `¢${price.slice(0, 3)},${price.slice(3)}`

    if (priceLength < 8) return `¢${price.slice(0, 1)},${price.slice(1, 4)}, ${price.slice(4)}`
    if (priceLength < 9) return `¢${price.slice(0, 2)},${price.slice(2, 5)}, ${price.slice(5)}`
    if (priceLength < 10) return `¢${price.slice(0, 3)},${price.slice(3, 6)}, ${price.slice(6)}`
    
    return `¢${price.slice(0, 1)},${price.slice(1, 4)}, ${price.slice(4, 7)}, ${price.slice(7)}`
};