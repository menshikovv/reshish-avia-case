import { routes } from '@/entities/business-case';
import { rubles, signedRubles } from '@/shared/lib/format';
import './route-comparison.scss';

export function RouteComparison() {
  const options = [
    { title: 'Петербург → Москва → Сочи → Москва → Петербург', value: routes.viaSochi },
    { title: 'Два рейса туда и обратно между Петербургом и Москвой', value: routes.directOnly },
  ];
  return (
    <section id="routes" className="workspace-card case-panel route-comparison" aria-labelledby="routes-title">
      <h2 id="routes-title">Стоит ли убрать Сочи?</h2>
      <p className="case-panel__note">Прибыль за весь пиковый день</p>
      <div className="route-comparison__bars">
        {options.map(({ title, value }, index) => (
          <div key={title}>
            <div className="route-comparison__label"><span>{title}</span><strong>{rubles(value)}</strong></div>
            <div className="route-comparison__track" aria-hidden="true">
              <div className={index === 0 ? 'route-comparison__fill--leading' : ''} style={{ width: `${100 * value / routes.viaSochi}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="case-panel__note route-comparison__outcome">
        дополнительные рейсы до Москвы дают {signedRubles(routes.addedDirect)}, а отказ от Сочи убирает {rubles(routes.lostSochi)} вклада.
        Итог <strong>{signedRubles(routes.directOnly - routes.viaSochi)} за день</strong>
      </p>
    </section>
  );
}

