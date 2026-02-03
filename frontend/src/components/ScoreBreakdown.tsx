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
}

function ImpactBar({ label, value }: ImpactBarProps) {
  // Monochrome: darker = higher impact (worse)
  const getBarColor = (v: number) => {
    if (v <= 20) return 'bg-gray-300';
    if (v <= 40) return 'bg-gray-400';
    if (v <= 60) return 'bg-gray-500';
    if (v <= 80) return 'bg-gray-600';
    return 'bg-gray-800';
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{value.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all ${getBarColor(value)}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
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
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className="w-full py-3 px-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Summary */}
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Environmental Score</span>
          <span className="font-semibold text-gray-900">{environmentalScore.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Certification Bonus</span>
          <span className="font-semibold text-gray-900">+{certificationBonus.toFixed(1)}%</span>
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
