import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'greatMotherJourneyStep';

export function useJourneyProgress() {
  const [step, setStep] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        return isNaN(parsed) ? 1 : parsed;
      }
      
      // Fallback/Initial checks
      const isCompleted = localStorage.getItem('milkimom_order_success') === 'true';
      if (isCompleted) return 8;

      const eligibilityDone = localStorage.getItem('milkimom_eligibility_completed_date');
      if (eligibilityDone) return 2;
    } catch (e) {}
    return 1;
  });

  const updateStep = useCallback((newVal: number) => {
    setStep(prev => {
      // Don't allow downgrading the progress unless force resetting
      if (newVal <= prev) return prev;
      
      try {
        localStorage.setItem(STORAGE_KEY, newVal.toString());
        if (newVal === 8) {
          localStorage.setItem('milkimom_order_success', 'true');
        }
      } catch (e) {}

      // Dispatch event to sync other hook instances immediately
      window.dispatchEvent(new CustomEvent('greatMotherJourneyStepUpdate', { detail: newVal }));
      return newVal;
    });
  }, []);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (customEvent && typeof customEvent.detail === 'number') {
        setStep(customEvent.detail);
      }
    };

    window.addEventListener('greatMotherJourneyStepUpdate', handleUpdate);
    return () => {
      window.removeEventListener('greatMotherJourneyStepUpdate', handleUpdate);
    };
  }, []);

  return { step, updateStep };
}
