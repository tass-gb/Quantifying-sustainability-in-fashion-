import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#84cc16'; // lime
  if (score >= 40) return '#eab308'; // yellow
  if (score >= 20) return '#f97316'; // orange
  return '#ef4444'; // red
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 20) return 'Poor';
  return 'Very Poor';
}

export function ScoreGauge({ score, size = 'md' }: ScoreGaugeProps) {
  const data = [
    { value: score },
    { value: 100 - score },
  ];

  const dimensions = {
    sm: { width: 120, height: 120, innerRadius: 35, outerRadius: 50 },
    md: { width: 180, height: 180, innerRadius: 55, outerRadius: 75 },
    lg: { width: 240, height: 240, innerRadius: 75, outerRadius: 100 },
  };

  const { width, height, innerRadius, outerRadius } = dimensions[size];
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div className="flex flex-col items-center">
      <div style={{ width, height }} className="relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
            >
              <Cell fill={color} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold"
            style={{
              fontSize: size === 'lg' ? '2.5rem' : size === 'md' ? '2rem' : '1.5rem',
              color,
            }}
          >
            {Math.round(score)}
          </span>
          <span className="text-gray-500 text-sm">/ 100</span>
        </div>
      </div>
      <span
        className="mt-2 font-semibold text-sm uppercase tracking-wide"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
