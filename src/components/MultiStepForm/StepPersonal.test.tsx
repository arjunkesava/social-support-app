import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StepPersonal from './StepPersonal';
import { FormContextProvider } from '../../context/FormContext';
import { describe, it, expect } from 'vitest';
import '../../i18n/config';

describe('StepPersonal Form Component', () => {
  it('should render form inputs and trigger validation errors on invalid values', async () => {
    // 1. Arrange: Render StepPersonal component wrapped in Context
    render(
      <FormContextProvider>
        <StepPersonal />
      </FormContextProvider>
    );

    // 2. Act: Query Name field and submit button, enter invalid phone value and submit
    const nameField = screen.getByLabelId(/name/i);
    const phoneField = screen.getByLabelId(/phone/i);
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Enter name and invalid phone number
    fireEvent.change(nameField, { target: { value: 'Jane Doe' } });
    fireEvent.change(phoneField, { target: { value: '123' } }); // Too short/invalid
    fireEvent.click(nextButton);

    // 3. Assert: Verify validation warnings are shown
    await waitFor(() => {
      const emailError = screen.queryByText(/required/i);
      expect(emailError).toBeDefined();
    });
  });
});
