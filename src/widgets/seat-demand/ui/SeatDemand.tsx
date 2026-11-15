import { useState } from 'react';
import type { CSSProperties } from 'react';
import { CAPACITY, demand } from '@/entities/business-case';
import type { Day } from '@/entities/business-case';
import { DaySwitch } from '@/features/day-switch';
import './seat-demand.scss';

export function SeatDemand() {
  const [day, setDay] = useState<Day>('peak');
  const { direct, transit } = demand[day];
  const total = direct + transit;
  const difference = total - CAPACITY;
  const max = Math.max(total, CAPACITY);
  const ratio = (value: number) => `${100 * value / max}%`;
  const width = (value: number): CSSProperties => ({ width: ratio(value) });

  return (
    <section className="workspace-card case-panel seat-demand" id="demand" aria-labelledby="demand-title">
      <div className="case-panel__heading">
        <div>
          <h2 id="demand-title">Спрос на общие кресла</h2>
          <p className="case-panel__note">при тарифах, рассчитанных без ограничения вместимости</p>
        </div>
        <DaySwitch day={day} onChange={setDay} />
      </div>
      <dl className="seat-demand__stats" aria-live="polite" aria-atomic="true">
        <div><dt><i className="seat-dot seat-dot--direct" />до Москвы</dt><dd>{direct}</dd></div>
        <div><dt><i className="seat-dot seat-dot--transit" />до Сочи с пересадкой</dt><dd>{transit}</dd></div>
        <div><dt>всего желающих</dt><dd>{total}</dd></div>
        <div><dt>вместимость</dt><dd>{CAPACITY}</dd></div>
      </dl>
      <div className="seat-demand__visual">
        <div className="seat-demand__caption">
          <span>Петербург → Москва</span>
          <strong>{difference > 0 ? `Спрос превышает вместимость на ${difference} мест` : `${-difference} мест свободно`}</strong>
        </div>
        <div className="seat-demand__track" aria-hidden="true">
          <span className="seat-demand__direct" style={width(direct)} />
          <span className="seat-demand__transit" style={width(transit)} />
          {difference > 0 && <span className="seat-demand__overflow" style={{ left: ratio(CAPACITY) }} />}
          <span className="seat-demand__capacity" style={{ left: ratio(CAPACITY) }} />
        </div>
        <div className="seat-demand__scale" aria-hidden="true">
          <span>0</span>
          <span style={{ left: ratio(CAPACITY) }}>150</span>
          {difference > 0 && <span>210</span>}
        </div>
        {difference > 0 && <p className="seat-demand__legend case-panel__note"><i />{difference} желающих сверх вместимости</p>}
      </div>
    </section>
  );
}

