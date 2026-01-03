'use client';

import { useMemo } from 'react';
import { Card, Button } from '../ui';
import { formatCurrency } from '@/utils';
import { useAIAssistant } from '@/context/AIAssistantContext';

interface SalaryComponent {
  label: string;
  amount: number;
  type: 'base' | 'bonus' | 'allowance' | 'deduction';
}

export default function SalaryInfoTab() {
  const { openAssistant } = useAIAssistant();
  
  // Mock salary data
  const salaryData = {
    baseSalary: 120000,
    bonus: 15000,
    allowances: {
      housing: 5000,
      transportation: 2000,
      meal: 3000,
    },
    deductions: {
      tax: 25000,
      insurance: 5000,
      retirement: 6000,
    },
    lastReview: '2024-01-15',
    nextReview: '2025-01-15',
  };

  // Auto-calculate values
  const calculations = useMemo(() => {
    const totalAllowances = Object.values(salaryData.allowances).reduce((sum, val) => sum + val, 0);
    const totalDeductions = Object.values(salaryData.deductions).reduce((sum, val) => sum + val, 0);
    const yearlyGross = salaryData.baseSalary + salaryData.bonus + totalAllowances;
    const yearlyNet = yearlyGross - totalDeductions;
    const monthlyGross = yearlyGross / 12;
    const monthlyNet = yearlyNet / 12;
    const monthlyBase = salaryData.baseSalary / 12;
    const monthlyBonus = salaryData.bonus / 12;
    const monthlyAllowances = totalAllowances / 12;
    const monthlyDeductions = totalDeductions / 12;

    return {
      yearlyGross,
      yearlyNet,
      monthlyGross,
      monthlyNet,
      monthlyBase,
      monthlyBonus,
      monthlyAllowances,
      monthlyDeductions,
      totalAllowances,
      totalDeductions,
    };
  }, [salaryData]);

  // Build salary components array
  const salaryComponents: SalaryComponent[] = [
    { label: 'Base Salary', amount: salaryData.baseSalary, type: 'base' },
    { label: 'Performance Bonus', amount: salaryData.bonus, type: 'bonus' },
    { label: 'Housing Allowance', amount: salaryData.allowances.housing, type: 'allowance' },
    { label: 'Transportation Allowance', amount: salaryData.allowances.transportation, type: 'allowance' },
    { label: 'Meal Allowance', amount: salaryData.allowances.meal, type: 'allowance' },
    { label: 'Tax Deduction', amount: -salaryData.deductions.tax, type: 'deduction' },
    { label: 'Insurance Deduction', amount: -salaryData.deductions.insurance, type: 'deduction' },
    { label: 'Retirement Contribution', amount: -salaryData.deductions.retirement, type: 'deduction' },
  ];

  return (
    <div className="space-y-6">
      {/* AI Assistant Help Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => openAssistant('salary')}
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Explain Salary
        </Button>
      </div>

      {/* Yearly & Monthly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Yearly Wage */}
        <Card className="bg-primary-950/20 border-primary-500/30">
          <h3 className="text-lg font-semibold text-primary-400 mb-6">Yearly Compensation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-primary-300 uppercase tracking-wide mb-2">
                Gross Annual Salary
              </label>
              <p className="text-3xl font-bold text-dark-text">
                {formatCurrency(calculations.yearlyGross)}
              </p>
            </div>
            <div className="pt-4 border-t border-primary-500/30">
              <label className="block text-xs font-medium text-primary-300 uppercase tracking-wide mb-2">
                Net Annual Salary
              </label>
              <p className="text-2xl font-bold text-primary-400">
                {formatCurrency(calculations.yearlyNet)}
              </p>
            </div>
          </div>
        </Card>

        {/* Monthly Wage */}
        <Card className="bg-primary-950/20 border-primary-500/30">
          <h3 className="text-lg font-semibold text-primary-400 mb-6">Monthly Compensation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-primary-300 uppercase tracking-wide mb-2">
                Gross Monthly Salary
              </label>
              <p className="text-3xl font-bold text-dark-text">
                {formatCurrency(calculations.monthlyGross)}
              </p>
            </div>
            <div className="pt-4 border-t border-primary-500/30">
              <label className="block text-xs font-medium text-primary-300 uppercase tracking-wide mb-2">
                Net Monthly Salary
              </label>
              <p className="text-2xl font-bold text-primary-400">
                {formatCurrency(calculations.monthlyNet)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Salary Component Breakdown */}
      <Card>
        <h3 className="text-lg font-semibold text-dark-text mb-6">Salary Component Breakdown</h3>
        
        <div className="space-y-4">
          {/* Earnings Section */}
          <div>
            <h4 className="text-sm font-semibold text-dark-textSecondary uppercase tracking-wide mb-3">
              Earnings
            </h4>
            <div className="space-y-2">
              {salaryComponents
                .filter((comp) => comp.type === 'base' || comp.type === 'bonus' || comp.type === 'allowance')
                .map((component) => (
                  <div
                    key={component.label}
                    className="flex items-center justify-between p-3 bg-dark-surfaceHover border border-dark-border rounded-lg"
                  >
                    <span className="text-sm text-dark-text">{component.label}</span>
                    <span className="text-sm font-semibold text-green-400">
                      +{formatCurrency(component.amount)}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Deductions Section */}
          <div className="pt-4 border-t border-dark-border">
            <h4 className="text-sm font-semibold text-dark-textSecondary uppercase tracking-wide mb-3">
              Deductions
            </h4>
            <div className="space-y-2">
              {salaryComponents
                .filter((comp) => comp.type === 'deduction')
                .map((component) => (
                  <div
                    key={component.label}
                    className="flex items-center justify-between p-3 bg-dark-surfaceHover border border-dark-border rounded-lg"
                  >
                    <span className="text-sm text-dark-text">{component.label}</span>
                    <span className="text-sm font-semibold text-red-400">
                      {formatCurrency(component.amount)}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Summary */}
          <div className="pt-4 border-t border-dark-border">
            <div className="flex items-center justify-between p-4 bg-primary-950/20 border border-primary-500/30 rounded-lg">
              <span className="text-sm font-semibold text-primary-300">Total Net Annual</span>
              <span className="text-xl font-bold text-primary-400">
                {formatCurrency(calculations.yearlyNet)}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-dark-surfaceHover border border-dark-border rounded-lg mt-2">
              <span className="text-sm font-semibold text-dark-textSecondary">Total Net Monthly</span>
              <span className="text-lg font-bold text-dark-text">
                {formatCurrency(calculations.monthlyNet)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <h3 className="text-lg font-semibold text-dark-text mb-6">Monthly Breakdown</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
            <p className="text-xs text-dark-textSecondary mb-1">Base Salary</p>
            <p className="text-lg font-semibold text-dark-text">
              {formatCurrency(calculations.monthlyBase)}
            </p>
          </div>
          <div className="p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
            <p className="text-xs text-dark-textSecondary mb-1">Bonus</p>
            <p className="text-lg font-semibold text-green-400">
              {formatCurrency(calculations.monthlyBonus)}
            </p>
          </div>
          <div className="p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
            <p className="text-xs text-dark-textSecondary mb-1">Allowances</p>
            <p className="text-lg font-semibold text-green-400">
              {formatCurrency(calculations.monthlyAllowances)}
            </p>
          </div>
          <div className="p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
            <p className="text-xs text-dark-textSecondary mb-1">Deductions</p>
            <p className="text-lg font-semibold text-red-400">
              {formatCurrency(-calculations.monthlyDeductions)}
            </p>
          </div>
        </div>
      </Card>

      {/* Salary History */}
        <Card>
          <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">Salary History</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
            <div>
              <p className="font-medium text-dark-text">Salary Review</p>
              <p className="text-sm text-dark-textSecondary mt-1">
                {new Date(salaryData.lastReview).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-dark-text">
                {formatCurrency(salaryData.baseSalary)}
              </p>
              <p className="text-xs text-dark-textSecondary">Base Salary</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Upcoming Review */}
        <Card>
          <h3 className="text-lg font-semibold text-dark-text mb-6 pb-3 border-b border-dark-border">Upcoming Review</h3>
        
        <div className="p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-dark-text">Next Salary Review</p>
              <p className="text-sm text-dark-textSecondary mt-1">
                {new Date(salaryData.nextReview).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div className="px-3 py-1 bg-primary-500/20 text-primary-400 border border-primary-500/50 rounded-full text-xs font-medium">
              Scheduled
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

