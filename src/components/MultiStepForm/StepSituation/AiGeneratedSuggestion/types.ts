export interface AiGeneratedSuggestionProps {
  open: boolean;
  suggestion: string;
  suggestionError: string;
  isLoading: boolean;
  isEditing: boolean;
  onAccept: () => void;
  onClose: () => void;
  onEdit: () => void;
  onSuggestionChange: (suggestion: string) => void;
}
