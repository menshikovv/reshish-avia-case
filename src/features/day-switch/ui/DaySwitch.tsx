import type { Day } from '@/entities/business-case';
import './day-switch.scss';

export function DaySwitch({ day, onChange }: { day: Day; onChange: (day: Day) => void }) {
  return (
    <div className="day-switch" role="group" aria-label="Тип дня">
      <button type="button" aria-pressed={day === 'ordinary'} onClick={() => onChange('ordinary')}>Обычный день</button>
      <button type="button" aria-pressed={day === 'peak'} onClick={() => onChange('peak')}>Пиковый день</button>
    </div>
  );
}

