'use client';

import { useState, FormEvent } from 'react';
import { LeaveType } from '@/types';
import { LEAVE_TYPES } from '@/constants/timeOff';
import { Button, Input, Card } from './ui';

interface LeaveApplicationFormProps {
  onSubmit: (data: {
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
  }) => void;
}

export default function LeaveApplicationForm({ onSubmit }: LeaveApplicationFormProps) {
  const [formData, setFormData] = useState({
    leaveType: 'vacation' as LeaveType,
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end < start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    onSubmit(formData);
    
    // Reset form
    setFormData({
      leaveType: 'vacation',
      startDate: '',
      endDate: '',
      reason: '',
    });
    setIsSubmitting(false);
  };

  const days = calculateDays(formData.startDate, formData.endDate);

  return (
    <Card>
      <h2 className="text-lg font-bold text-dark-text mb-6">Apply for Leave</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Leave Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-dark-text">
            Leave Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(LEAVE_TYPES).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFormData({ ...formData, leaveType: key as LeaveType })}
                className={`
                  p-4 rounded-lg border-2 transition-all
                  ${
                    formData.leaveType === key
                      ? 'border-primary-500 bg-primary-500/10'
                      : 'border-dark-border bg-dark-surfaceHover hover:border-primary-500/50'
                  }
                `}
              >
                <div className="text-2xl mb-1">{value.icon}</div>
                <div className="text-xs font-medium text-dark-text">{value.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e) => {
              setFormData({ ...formData, startDate: e.target.value });
              if (errors.startDate) {
                setErrors({ ...errors, startDate: '' });
              }
            }}
            error={errors.startDate}
            required
          />
          <Input
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e) => {
              setFormData({ ...formData, endDate: e.target.value });
              if (errors.endDate) {
                setErrors({ ...errors, endDate: '' });
              }
            }}
            error={errors.endDate}
            required
          />
        </div>

        {/* Days Calculation */}
        {days > 0 && (
          <div className="p-4 bg-dark-surfaceHover border border-dark-border rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-dark-textSecondary">Total Days</span>
              <span className="text-lg font-semibold text-dark-text">{days} day{days !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}

        {/* Reason */}
        <div>
          <label className="block mb-2 text-sm font-medium text-dark-text">
            Reason
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => {
              setFormData({ ...formData, reason: e.target.value });
              if (errors.reason) {
                setErrors({ ...errors, reason: '' });
              }
            }}
            rows={4}
            className="w-full px-4 py-3 bg-dark-surfaceHover border border-dark-border rounded-lg text-dark-text placeholder-dark-textMuted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Please provide a reason for your leave request..."
            required
          />
          {errors.reason && (
            <p className="mt-2 text-sm text-red-400">{errors.reason}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
        </Button>
      </form>
    </Card>
  );
}

