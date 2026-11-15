const number = new Intl.NumberFormat('ru-RU');

export function formatNumber(value: number) {
  return number.format(value);
}

export function rubles(value: number) {
  return `${formatNumber(value)} ₽`;
}

export function signedRubles(value: number) {
  return `${value > 0 ? '+' : value < 0 ? '−' : ''}${rubles(Math.abs(value))}`;
}

