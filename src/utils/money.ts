export const formatCurrency = (value: number): string => value.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' });

/**
 * Represents monetary values in cents.
 */
type Money = number;

/**
 * Represents supported currencies.
 */
export type Currency = 'PEN' | 'USD';

/**
 * Configuration options for monetary operations.
 */
interface MoneyConfig {
  currency: Currency;
  taxRate?: number; // Optional default tax rate
}

/**
 * Default configuration for monetary operations.
 */
const defaultConfig: MoneyConfig = {
  currency: 'PEN',
};

/**
 * Converts a monetary value from units (e.g., PEN) to cents.
 * @param units - The monetary value in units (e.g., 100.25 for S/ 100.25).
 * @returns The monetary value in cents (e.g., 10025 for S/ 100.25).
 */
export const toCents = (units: number): Money => Math.round(units * 100);

/**
 * Converts a monetary value from cents to units.
 * @param cents - The monetary value in cents (e.g., 10025 for S/ 100.25).
 * @returns The monetary value in units as a string formatted to two decimal places.
 */
export const toUnits = (cents: Money): string => (cents / 100).toFixed(2);

/**
 * Sums an array of monetary values in cents.
 * @param amounts - An array of monetary values in cents.
 * @returns The total sum in cents.
 */
export const sum = (...amounts: Money[]): Money => amounts.reduce((total, amount) => total + amount, 0);

/**
 * Applies a tax percentage to a monetary value in cents.
 * @param amount - The monetary value in cents.
 * @param taxRate - The tax rate as a percentage (e.g., 18 for 18%). If not provided, uses the default tax rate from config.
 * @param config - Optional configuration for tax application.
 * @returns The new monetary value in cents after applying the tax.
 */
export const applyTax = (amount: Money, taxRate?: number, config: MoneyConfig = defaultConfig): Money => {
  const rate = taxRate ?? config.taxRate ?? 0;
  return Math.round(amount * (1 + rate / 100));
};

/**
 * Applies a discount percentage to a monetary value in cents.
 * @param amount - The monetary value in cents.
 * @param discountRate - The discount rate as a percentage (e.g., 10 for 10%).
 * @returns The new monetary value in cents after applying the discount.
 */
export const applyDiscount = (amount: Money, discountRate: number): Money => Math.round(amount * (1 - discountRate / 100));

/**
 * Formats a monetary value in cents into a string with the currency.
 * @param cents - The monetary value in cents.
 * @param currency - The currency symbol (default: "PEN").
 * @returns A formatted string representing the monetary value (e.g., "PEN 100.25").
 */
export const formatMoney = (cents: Money, currency: Currency = 'PEN'): string => `${currency} ${toUnits(cents)}`;

/**
 * Validates if a monetary value in units is a valid amount.
 * @param units - The monetary value in units (e.g., 100.25).
 * @returns True if the value is valid (non-negative and has up to two decimal places), otherwise false.
 */
export const validateAmount = (units: number): boolean => units >= 0 && Number.isInteger(units * 100);

/**
 * Parses a formatted monetary string into cents.
 * @param formatted - A string representing a monetary value (e.g., "PEN 100.25").
 * @param currency - The expected currency symbol (default: "PEN").
 * @returns The monetary value in cents.
 */
export const parseMoney = (formatted: string, currency: Currency = 'PEN'): Money => {
  if (!formatted.startsWith(currency)) {
    throw new Error(`Invalid currency format: expected ${currency}`);
  }
  const [, value] = formatted.match(/\d+(\.\d{1,2})?$/) ?? [];
  return value ? toCents(parseFloat(value)) : 0;
};

/**
 * Converts between currencies using a given exchange rate.
 * @param amount - The monetary value in cents.
 * @param fromCurrency - The original currency of the amount.
 * @param toCurrency - The target currency for conversion.
 * @param exchangeRate - The exchange rate from the original to the target currency.
 * @returns The converted monetary value in cents.
 */
export const convertCurrency = (amount: Money, fromCurrency: Currency, toCurrency: Currency, exchangeRate: number): Money => {
  if (fromCurrency === toCurrency) return amount;
  return Math.round(amount * exchangeRate);
};
