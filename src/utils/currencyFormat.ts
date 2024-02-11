export interface CurrencyFormatOptions {
  value: number;
  locales: 'en-US' | 'es-CO' | 'es-MX';
  currency: 'USD' | 'COP' | 'MXN';
}

export const currencyFormat = ({
  value,
  locales,
  currency,
}: CurrencyFormatOptions) => {
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
