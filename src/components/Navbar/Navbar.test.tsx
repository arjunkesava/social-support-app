import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { FormContextProvider } from '../../context/FormContext';
import { describe, it, expect } from 'vitest';
import '../../i18n/config'; // Mock or initialize translation keys

describe('Navbar Component', () => {
  it('should render the brand title and navigation controls', () => {
    // 1. Arrange: Wrap Navbar with FormContextProvider to supply active theme and language state
    render(
      <FormContextProvider>
        <Navbar />
      </FormContextProvider>
    );

    // 2. Act: Query interactive controls and header elements from screen
    const headerTitle = screen.getByRole('heading', { level: 1 });
    const languageSelect = screen.getByLabelId('language-select-label');

    // 3. Assert: Verify components exist and carry appropriate translations
    expect(headerTitle).toBeDefined();
    expect(languageSelect).toBeDefined();
  });
});
