import { expectedProfit, weather } from '@/entities/business-case';
import { formatNumber, rubles, signedRubles } from '@/shared/lib/format';
import './weather-pricing.scss';

const options = [
  { title: 'Обычные тарифы', ...weather.ordinary },
  { title: 'Тарифы с учётом риска', ...weather.adjusted },
];

export function WeatherPricing() {
  const gain = expectedProfit(weather.adjusted) - expectedProfit(weather.ordinary);
  const chanceOfFlight = formatNumber(1 - weather.cancellation);
  const chanceOfCancellation = formatNumber(weather.cancellation);

  return (
    <section id="weather" className="workspace-card case-panel weather-pricing" aria-labelledby="weather-title">
      <h2 id="weather-title">Менять ли тарифы при риске отмены?</h2>
      <p className="case-panel__note">Вероятность отмены {weather.cancellation * 100}%, компенсация {rubles(weather.compensation)} за билет</p>
      <div className="weather-pricing__options">
        {options.map((option) => (
          <div key={option.title}>
            <h3>{option.title}</h3>
            <strong>{rubles(expectedProfit(option))}</strong>
            <span>ожидаемая прибыль</span>
          </div>
        ))}
      </div>
      <p className="case-panel__note weather-pricing__note">
        <strong>{signedRubles(gain)}</strong> к ожидаемой прибыли. при более высоких тарифах компания продаёт меньше билетов
        и платит меньше компенсаций при отмене
      </p>
      <details className="weather-pricing__details">
        <summary><span>Показать расчёт</span><span>Скрыть расчёт</span></summary>
        <div>
          <p>Умножаем прибыль за день при выполнении всех рейсов на вероятность вылета и вычитаем ожидаемые компенсации.</p>
          {options.map((option) => (
            <p key={option.title}>
              <b>{option.title}.</b> {chanceOfFlight} × {formatNumber(option.profitIfFlown)} − {chanceOfCancellation} × {option.tickets} × {formatNumber(weather.compensation)} = <strong>{rubles(expectedProfit(option))}</strong>.
            </p>
          ))}
        </div>
      </details>
    </section>
  );
}


