import { useState } from 'react';

type FormState = {
  [key: string]: string;
};

export function useForm(initialState: FormState) {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(1);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const resetForm = () => {
    setForm(initialState);
    setStep(1);
  };

  return { form, step, updateField, nextStep, prevStep, resetForm };
}