import axios from 'axios';
import type { FamilyFinancialInfo, PersonalInfo, SituationDescriptions } from '../context/FormContext';

export type SituationField = keyof SituationDescriptions;

export interface WritingSuggestionRequest {
  field: SituationField;
  fieldLabel: string;
  existingText: string;
  personal: PersonalInfo;
  family: FamilyFinancialInfo;
}

interface WritingSuggestionResponse {
  suggestion: string;
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000',
  timeout: 25000,
});

export const getWritingSuggestion = async (payload: WritingSuggestionRequest) => {
  const response = await apiClient.post<WritingSuggestionResponse>('/api/help-me-write', payload);
  return response.data.suggestion;
};
