import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

function getScoreColor(score: number): string {
  // Monochrome: darker = better score
  if (score >= 80) return '#1f2937'; // gray-800
  if (score >= 60) return '#374151'; // gray-700
  if (score >= 40) return '#6b7280'; // gray-500
  if (score >= 20) return '#9ca3af'; // gray-400
  return '#d1d5db'; // gray-300
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
              <Cell fill="#f3f4f6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-semibold text-gray-900"
            style={{
              fontSize: size === 'lg' ? '2.5rem' : size === 'md' ? '2rem' : '1.5rem',
            }}
          >
            {Math.round(score)}
          </span>
          <span className="text-gray-400 text-sm">/ 100</span>
        </div>
      </div>
      <span className="mt-2 font-medium text-sm uppercase tracking-wide text-gray-500">
        {label}
      </span>
    </div>
  );
}
