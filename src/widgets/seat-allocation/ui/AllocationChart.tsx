import { useEffect, useRef, useState } from 'react';
import { allocation, BASE_ALLOCATION, BEST_ALLOCATION, MAX_TRANSIT } from '@/entities/business-case';
import type { Allocation } from '@/entities/business-case';
import { formatNumber, rubles } from '@/shared/lib/format';

const curve = Array.from({ length: MAX_TRANSIT + 1 }, (_, seats) => allocation(seats));
const ticksX = [0, 10, 20, 30, 40, 50, 60];
const ticksY = [1_250_000, 1_300_000, 1_350_000, 1_400_000, 1_450_000, 1_500_000];

export function AllocationChart({ selected, onSelect }: { selected: Allocation; onSelect: (seats: number) => void }) {
  const surface = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(580);
  useEffect(() => {
    const element = surface.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const height = width < 410 ? 211 : 249;
  const left = 44;
  const right = Math.max(left + 1, width - 14);
  const top = 13;
  const bottom = height - 36;
  const x = (seats: number) => left + seats / MAX_TRANSIT * (right - left);
  const y = (value: number) => bottom - (value - 1_230_000) / 270_000 * (bottom - top);
  const line = curve.map(({ transit, contribution }) => `${x(transit)},${y(contribution)}`).join(' ');
  const markers = [BASE_ALLOCATION, BEST_ALLOCATION];

  return (
    <figure className="allocation-chart" aria-labelledby="chart-caption">
      <figcaption id="chart-caption">Вклад двух направлений, тысяч рублей</figcaption>
      <div className="allocation-chart__surface" ref={surface}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="chart-title chart-summary">
          <title id="chart-title">Вклад в прибыль при распределении 150 кресел</title>
          <desc id="chart-summary">
            Максимум {rubles(BEST_ALLOCATION.contribution)} при 20 местах до Сочи.
            Выбрано {selected.transit} мест до Сочи с вкладом {rubles(selected.contribution)}.
          </desc>
          {ticksY.map((value) => (
            <g key={value}>
              <line className="chart-grid" x1={left} x2={right} y1={y(value)} y2={y(value)} />
              <text x={left - 7} y={y(value) + 4} textAnchor="end">{formatNumber(value / 1_000)}</text>
            </g>
          ))}
          {ticksX.map((value) => (
            <text key={value} x={x(value)} y={bottom + 18} textAnchor="middle">{value}</text>
          ))}
          <line className="chart-axis" x1={left} x2={right} y1={bottom} y2={bottom} />
          <line className="chart-pointer" x1={x(selected.transit)} x2={x(selected.transit)} y1={y(selected.contribution)} y2={bottom} />
          <polyline className="chart-curve" points={line} />
          {markers.map(({ transit, contribution }) => (
            <circle key={transit} className="chart-reference" cx={x(transit)} cy={y(contribution)} r="4.5">
              <title>{transit === 0 ? 'Все места прямым' : 'Лучшее распределение'}: {rubles(contribution)}</title>
            </circle>
          ))}
          <circle className="chart-active" cx={x(selected.transit)} cy={y(selected.contribution)} r="6" />
          <text className="chart-x-label" x={(left + right) / 2} y={height - 3} textAnchor="middle">Места для пассажиров до Сочи</text>
        </svg>
      </div>
      <div className="allocation-chart__legend">
        {markers.map(({ transit, contribution }) => (
          <button type="button" key={transit} aria-pressed={selected.transit === transit} onClick={() => onSelect(transit)}>
            <i />{transit === 0 ? 'Все места прямым' : 'Лучшее распределение'} <b>{rubles(contribution)}</b>
          </button>
        ))}
      </div>
    </figure>
  );
}


