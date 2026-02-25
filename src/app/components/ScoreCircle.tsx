import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreCircle({ score, size = 180, strokeWidth = 14 }: ScoreCircleProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(score), 200);
    return () => clearTimeout(timeout);
  }, [score]);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  const color =
    score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
  const label =
    score >= 80 ? 'Excelente' : score >= 60 ? 'Bom' : 'Precisa Melhorar';
  const bgColor =
    score >= 80 ? '#dcfce7' : score >= 60 ? '#fef3c7' : '#fee2e2';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </svg>
      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{ width: size * 0.55 }}
      >
        <div style={{ fontSize: size * 0.22, fontWeight: 800, color, lineHeight: 1 }}>
          {Math.round(animated)}
        </div>
        <div style={{ fontSize: size * 0.09, color: '#94a3b8', marginTop: 2 }}>/ 100</div>
        <div
          className="mt-1 rounded-full px-2 py-0.5"
          style={{
            fontSize: size * 0.075,
            color,
            background: bgColor,
            fontWeight: 700,
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
