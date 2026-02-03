import { useState } from 'react';
import type { ScoreBreakdown as ScoreBreakdownType } from '../types';

interface ScoreBreakdownProps {
  breakdown: ScoreBreakdownType;
  environmentalScore: number;
  certificationBonus: number;
}

interface ImpactBarProps {
  label: string;
  value: number;
  description?: string;
}

function ImpactBar({ label, value, description }: ImpactBarProps) {
  // Lower is better for impact scores, so we invert the color
  const getBarColor = (v: number) => {
    if (v <= 20) return 'bg-green-500';
    if (v <= 40) return 'bg-lime-500';
    if (v <= 60) return 'bg-yellow-500';
    if (v <= 80) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getBarColor(value)}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      {description && (
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      )}
    </div>
  );
}

interface AccordionSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function AccordionSection({ title, isOpen, onToggle, children }: AccordionSectionProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full py-3 px-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function ScoreBreakdown({ breakdown, environmentalScore, certificationBonus }: ScoreBreakdownProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['material']));

  const toggleSection = (section: string) => {
    const newSections = new Set(openSections);
    if (newSections.has(section)) {
      newSections.delete(section);
    } else {
      newSections.add(section);
    }
    setOpenSections(newSections);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Summary */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Environmental Score</span>
          <span className="font-semibold text-green-600">{environmentalScore.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Certification Bonus</span>
          <span className="font-semibold text-blue-600">+{certificationBonus.toFixed(1)}%</span>
        </div>
      </div>

      {/* Material Impact */}
      <AccordionSection
        title="Material Impact"
        isOpen={openSections.has('material')}
        onToggle={() => toggleSection('material')}
      >
        <p className="text-sm text-gray-500 mb-3">
          Impact from raw material production (lower is better)
        </p>
        <ImpactBar label="Carbon Emissions" value={breakdown.material_impact.co2} />
        <ImpactBar label="Water Usage" value={breakdown.material_impact.water} />
        <ImpactBar label="Energy Consumption" value={breakdown.material_impact.energy} />
        <ImpactBar label="Chemical Impact" value={breakdown.material_impact.chemical} />
      </AccordionSection>

      {/* Care Impact */}
      <AccordionSection
        title="Care Phase Impact"
        isOpen={openSections.has('care')}
        onToggle={() => toggleSection('care')}
      >
        <p className="text-sm text-gray-500 mb-3">
          Impact from garment care during use phase (lower is better)
        </p>
        <ImpactBar label="Carbon Emissions" value={breakdown.care_impact.co2} />
        <ImpactBar label="Water Usage" value={breakdown.care_impact.water} />
        <ImpactBar label="Energy Consumption" value={breakdown.care_impact.energy} />
      </AccordionSection>

      {/* Origin Impact */}
      <AccordionSection
        title="Manufacturing Origin"
        isOpen={openSections.has('origin')}
        onToggle={() => toggleSection('origin')}
      >
        <p className="text-sm text-gray-500 mb-3">
          Impact from manufacturing location (lower is better)
        </p>
        <ImpactBar label="Grid Energy Intensity" value={breakdown.origin_impact.grid} />
        <ImpactBar label="Transport Impact" value={breakdown.origin_impact.transport} />
        <ImpactBar label="Manufacturing Process" value={breakdown.origin_impact.manufacturing} />
      </AccordionSection>
    </div>
  );
}
