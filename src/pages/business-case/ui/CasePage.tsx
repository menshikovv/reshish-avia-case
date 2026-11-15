import { SeatDemand } from '@/widgets/seat-demand';
import { SeatAllocation } from '@/widgets/seat-allocation';
import { RouteComparison } from '@/widgets/route-comparison';
import { WeatherPricing } from '@/widgets/weather-pricing';
import './case-page.scss';

export function CasePage() {
  return (
    <main className="shell case-page" id="main">
      <section className="hero" aria-labelledby="case-title">
        <div className="hero__text">
          <h1 id="case-title">Кому отдать 150 кресел?</h1>
          <p className="hero__description">
            На рейсе Петербург → Москва летят и те, кто выходит в Москве, и те, кто пересаживается
            на рейс до Сочи. Эти пассажиры занимают одни и те же кресла!!!
          </p>
        </div>
      </section>
      <SeatDemand />
      <SeatAllocation />
      <div className="case-page__decisions">
        <RouteComparison />
        <WeatherPricing />
      </div>
    </main>
  );
}

