interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
}

function MetricCard({ label, value, delta, deltaType = "neutral" }: MetricCardProps) {
  return (
    <div className="eco-metric-card">
      <div className="eco-metric-card__label">{label}</div>
      <div className="eco-metric-card__value">{value}</div>
      {delta && (
        <div className={`eco-metric-card__delta eco-metric-card__delta--${deltaType}`}>
          {delta}
        </div>
      )}
    </div>
  );
}

export function MetricsGrid() {
  return (
    <div className="eco-metrics">
      <MetricCard
        label="Cliques Totais"
        value="2,438"
        delta="+12% vs semana anterior"
        deltaType="positive"
      />
      <MetricCard
        label="Produtos Ativos"
        value="124"
        delta="3 novos esta semana"
        deltaType="positive"
      />
      <MetricCard
        label="Taxa de Conversão"
        value="3.2%"
        delta="-0.5% vs mês anterior"
        deltaType="negative"
      />
      <MetricCard
        label="Receita Estimada"
        value="R$ 1,245"
        delta="Comissões de cliques"
        deltaType="neutral"
      />
    </div>
  );
}
