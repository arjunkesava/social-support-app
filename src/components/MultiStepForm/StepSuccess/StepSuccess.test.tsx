import { render, screen, fireEvent } from '@testing-library/react';
import StepSuccess from './StepSuccess';
import { FormContextProvider } from '../../../context/FormContext';
import { describe, it, expect } from 'vitest';
import '../../../i18n/config';

describe('StepSuccess Component', () => {
  it('should render the final summary and the start over action button', () => {
    // 1. Arrange: Render StepSuccess component
    render(
      <FormContextProvider>
        <StepSuccess />
      </FormContextProvider>
    );

    // 2. Act: Query success title and restart action button
    const successTitle = screen.getByRole('heading', { level: 2 });
    const restartButton = screen.getByRole('button', { name: /start over/i });

    // Click restart button
    fireEvent.click(restartButton);

    // 3. Assert: Verify elements exist on screen and clicking reset is actionable
    expect(successTitle).toBeDefined();
    expect(restartButton).toBeDefined();
  });
});
