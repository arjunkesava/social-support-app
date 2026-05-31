import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { FormContextProvider } from '../../context/FormContext';
import { describe, it, expect } from 'vitest';

describe('Layout Component', () => {
  it('should render children within the ThemeProvider and Layout shell', () => {
    // 1. Arrange: Set up the test child element
    const testMessage = 'Frosted Glass Layout Shell';

    // 2. Act: Render the Layout inside the required Context Provider
    render(
      <FormContextProvider>
        <Layout>
          <div data-testid="test-child">{testMessage}</div>
        </Layout>
      </FormContextProvider>
    );

    // 3. Assert: Verify the child is successfully presented in the DOM
    const childElement = screen.getByTestId('test-child');
    expect(childElement).toBeDefined();
    expect(childElement.textContent).toBe(testMessage);
  });
});
