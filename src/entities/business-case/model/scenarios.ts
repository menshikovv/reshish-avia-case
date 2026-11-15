export type Day = 'ordinary' | 'peak';

export const CAPACITY = 150;
export const MAX_TRANSIT = 60;
const localDemand = { ordinary: 200, peak: 360 };
const connectingDemand = 100;
const localSlope = 20;
const connectingSlope = 10;
const localCost = 1_000;
const connectingCost = 2_000;

export const demand = {
  ordinary: { direct: (localDemand.ordinary - localSlope * localCost / 1_000) / 2, transit: 40 },
  peak: { direct: (localDemand.peak - localSlope * localCost / 1_000) / 2, transit: 40 },
} satisfies Record<Day, { direct: number; transit: number }>;

export function allocation(transit: number) {
  const direct = CAPACITY - transit;
  const directFare = (localDemand.peak - direct) * 1_000 / localSlope;
  const transitFare = transit ? (connectingDemand - transit) * 1_000 / connectingSlope : null;
  return {
    direct,
    transit,
    directFare,
    transitFare,
    contribution: direct * (directFare - localCost)
      + (transitFare === null ? 0 : transit * (transitFare - connectingCost)),
  };
}

export type Allocation = ReturnType<typeof allocation>;
export const BASE_ALLOCATION = allocation(0);
export const BEST_ALLOCATION = Array.from({ length: MAX_TRANSIT + 1 }, (_, seats) => allocation(seats))
  .reduce((best, option) => option.contribution > best.contribution ? option : best);

export const routes = {
  viaSochi: 1_625_000,
  addedDirect: 80_000,
  lostSochi: 415_000,
  get directOnly() { return this.viaSochi + this.addedDirect - this.lostSochi; },
};

export const weather = {
  cancellation: 0.2,
  compensation: 4_000,
  ordinary: { tickets: 320, profitIfFlown: 705_000 },
  adjusted: { tickets: 270, profitIfFlown: 680_000 },
};

export function expectedProfit(option: typeof weather.ordinary) {
  return Math.round((1 - weather.cancellation) * option.profitIfFlown
    - weather.cancellation * option.tickets * weather.compensation);
}

