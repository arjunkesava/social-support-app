import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StepSituation from './StepSituation';
import { FormContextProvider } from '../../context/FormContext';
import { describe, it, expect } from 'vitest';
import '../../i18n/config';

describe('StepSituation Form Component', () => {
  it('should render descriptive textareas and enforce minimum character length', async () => {
    // 1. Arrange: Render StepSituation component wrapped in Context
    render(
      <FormContextProvider>
        <StepSituation />
      </FormContextProvider>
    );

    // 2. Act: Query textareas and enter an extremely short string, then click submit
    const financialTextArea = screen.getByLabelId(/financial situation/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(financialTextArea, { target: { value: 'Too short' } });
    fireEvent.click(submitButton);

    // 3. Assert: Verify error is presented because length is less than 15 characters
    await waitFor(() => {
      const minLengthError = screen.queryByText(/at least 15/i);
      expect(minLengthError).toBeDefined();
    });
  });
});
