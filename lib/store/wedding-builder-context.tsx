'use client';

import React, { createContext, useContext, useState } from 'react';
import { CustomBuilderState } from '../types/wedding';
import { DEFAULT_BUILDER_STATE } from '../mock-data';

interface WeddingBuilderContextType {
  state: CustomBuilderState;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleService: (serviceId: string, quantity?: number) => void;
  updateServiceQuantity: (serviceId: string, quantity: number) => void;
  updateCatering: (data: Partial<CustomBuilderState['catering']>) => void;
  updatePhotography: (data: Partial<CustomBuilderState['photography']>) => void;
  updateMakeup: (data: Partial<CustomBuilderState['makeup']>) => void;
  updatePurohit: (data: Partial<CustomBuilderState['purohit']>) => void;
  updateSecurity: (data: Partial<CustomBuilderState['security']>) => void;
  updateWelcomeGirls: (data: Partial<CustomBuilderState['welcomeGirls']>) => void;
  updateDancers: (data: Partial<CustomBuilderState['dancers']>) => void;
  saveDraft: () => void;
  loadDraft: () => void;
  resetBuilder: () => void;
}

const WeddingBuilderContext = createContext<WeddingBuilderContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'sid_events_builder_draft_v1';

export const WeddingBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CustomBuilderState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved draft:', e);
        }
      }
    }
    return DEFAULT_BUILDER_STATE;
  });

  const setStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: Math.min(Math.max(1, step), 9) }));
  };

  const nextStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 9) }));
  };

  const prevStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }));
  };

  const toggleService = (serviceId: string, quantity: number = 1) => {
    setState((prev) => {
      const current = { ...prev.selectedServices };
      if (current[serviceId]) {
        delete current[serviceId];
      } else {
        current[serviceId] = { serviceId, quantity };
      }
      return { ...prev, selectedServices: current };
    });
  };

  const updateServiceQuantity = (serviceId: string, quantity: number) => {
    setState((prev) => {
      const current = { ...prev.selectedServices };
      if (quantity <= 0) {
        delete current[serviceId];
      } else {
        current[serviceId] = { serviceId, quantity };
      }
      return { ...prev, selectedServices: current };
    });
  };

  const updateCatering = (data: Partial<CustomBuilderState['catering']>) => {
    setState((prev) => ({ ...prev, catering: { ...prev.catering, ...data } }));
  };

  const updatePhotography = (data: Partial<CustomBuilderState['photography']>) => {
    setState((prev) => ({ ...prev, photography: { ...prev.photography, ...data } }));
  };

  const updateMakeup = (data: Partial<CustomBuilderState['makeup']>) => {
    setState((prev) => ({ ...prev, makeup: { ...prev.makeup, ...data } }));
  };

  const updatePurohit = (data: Partial<CustomBuilderState['purohit']>) => {
    setState((prev) => ({ ...prev, purohit: { ...prev.purohit, ...data } }));
  };

  const updateSecurity = (data: Partial<CustomBuilderState['security']>) => {
    setState((prev) => ({ ...prev, security: { ...prev.security, ...data } }));
  };

  const updateWelcomeGirls = (data: Partial<CustomBuilderState['welcomeGirls']>) => {
    setState((prev) => ({ ...prev, welcomeGirls: { ...prev.welcomeGirls, ...data } }));
  };

  const updateDancers = (data: Partial<CustomBuilderState['dancers']>) => {
    setState((prev) => ({ ...prev, dancers: { ...prev.dancers, ...data } }));
  };

  const saveDraft = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    }
  };

  const loadDraft = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          setState(JSON.parse(saved));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const resetBuilder = () => {
    setState(DEFAULT_BUILDER_STATE);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  return (
    <WeddingBuilderContext.Provider
      value={{
        state,
        setStep,
        nextStep,
        prevStep,
        toggleService,
        updateServiceQuantity,
        updateCatering,
        updatePhotography,
        updateMakeup,
        updatePurohit,
        updateSecurity,
        updateWelcomeGirls,
        updateDancers,
        saveDraft,
        loadDraft,
        resetBuilder,
      }}
    >
      {children}
    </WeddingBuilderContext.Provider>
  );
};

export const useWeddingBuilder = () => {
  const context = useContext(WeddingBuilderContext);
  if (!context) {
    throw new Error('useWeddingBuilder must be used within a WeddingBuilderProvider');
  }
  return context;
};
