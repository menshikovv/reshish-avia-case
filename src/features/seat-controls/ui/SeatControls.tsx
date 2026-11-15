import { MAX_TRANSIT } from '@/entities/business-case';
import './seat-controls.scss';

export function SeatControls({ seats, onChange }: { seats: number; onChange: (seats: number) => void }) {
  return (
    <div className="seat-controls">
      <div className="seat-controls__label">
        <label htmlFor="transit-seats">Места для пассажиров с пересадкой</label>
        <output htmlFor="transit-seats" className="seat-controls__count" aria-live="off">{seats}</output>
      </div>
      <input
        id="transit-seats"
        type="range"
        min={0}
        max={MAX_TRANSIT}
        step={1}
        value={seats}
        aria-valuetext={`${seats} из ${MAX_TRANSIT} мест`}
        onChange={(event) => onChange(event.currentTarget.valueAsNumber)}
      />
      <div className="seat-controls__range" aria-hidden="true"><span>0</span><span>{MAX_TRANSIT}</span></div>
    </div>
  );
}


