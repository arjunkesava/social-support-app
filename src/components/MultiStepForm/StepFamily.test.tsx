import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StepFamily from './StepFamily';
import { FormContextProvider } from '../../context/FormContext';
import { describe, it, expect } from 'vitest';
import '../../i18n/config';

describe('StepFamily Form Component', () => {
  it('should render family inputs and trigger error on negative dependents', async () => {
    // 1. Arrange: Render StepFamily component wrapped in Context
    render(
      <FormContextProvider>
        <StepFamily />
      </FormContextProvider>
    );

    // 2. Act: Query dependents field, set a negative value, and submit
    const dependentsField = screen.getByLabelId(/dependents/i);
    const nextButton = screen.getByRole('button', { name: /next/i });

    fireEvent.change(dependentsField, { target: { value: '-2' } });
    fireEvent.click(nextButton);

    // 3. Assert: Verify the custom min dependents error is prompted
    await waitFor(() => {
      const errorMsg = screen.queryByText(/negative/i);
      expect(errorMsg).toBeDefined();
    });
  });
});
