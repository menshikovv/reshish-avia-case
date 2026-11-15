import { useState } from 'react';
import { allocation, BASE_ALLOCATION, BEST_ALLOCATION, CAPACITY } from '@/entities/business-case';
import { SeatControls } from '@/features/seat-controls';
import { rubles, signedRubles } from '@/shared/lib/format';
import { AllocationChart } from './AllocationChart';
import './seat-allocation.scss';

export function SeatAllocation() {
  const [seats, setSeats] = useState(0);
  const selected = allocation(seats);
  const delta = selected.contribution - BASE_ALLOCATION.contribution;
  const isBest = seats === BEST_ALLOCATION.transit;

  return (
    <section id="allocation" className="workspace-card case-panel seat-allocation" aria-labelledby="allocation-title">
      <div className="case-panel__heading">
        <h2 id="allocation-title">Сколько мест оставить пассажирам до Сочи?</h2>
        <p className="case-panel__note">Пиковый день · {CAPACITY} кресел</p>
      </div>
      <div className="seat-allocation__grid">
        <div className="seat-allocation__controls">
          <SeatControls seats={seats} onChange={setSeats} />
          <div aria-live="polite" aria-atomic="true" className="seat-allocation__results">
            <dl className="seat-allocation__fares">
              <div><dt>до Москвы</dt><dd>{selected.direct} мест</dd><dd>{rubles(selected.directFare)} за билет</dd></div>
              <div><dt>до Сочи</dt><dd>{selected.transit} мест</dd><dd>{selected.transitFare === null ? 'Без продаж' : `${rubles(selected.transitFare)} за билет`}</dd></div>
            </dl>
            <div className="seat-allocation__total">
              <p>Вклад двух направлений</p>
              <strong>{rubles(selected.contribution)}</strong>
              {delta !== 0 && <span className={delta > 0 ? 'is-gain' : 'is-loss'}>{signedRubles(delta)} к варианту "Все места прямым"</span>}
            </div>
          </div>
        </div>
        <AllocationChart selected={selected} onSelect={setSeats} />
      </div>
      <p className="case-panel__note seat-allocation__insight">
        {isBest
          ? `при ${selected.transit} местах для пассажиров с пересадкой вклад достигает максимума. дальше он снижается`
          : `в обычный день билет до Сочи стоит ${rubles(6_000)}. на пике при лучшем распределении он стоит ${rubles(BEST_ALLOCATION.transitFare!)}: спрос до Сочи прежний, а общих кресел не хватает`}
      </p>
    </section>
  );
}


