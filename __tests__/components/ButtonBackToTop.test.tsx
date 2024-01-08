// __tests__/components/ButtonBackToTop.test.tsx

import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import ButtonBackToTop from '@/app/components/ButtonBackToTop';

// Mock the window.scrollTo function
window.scrollTo = jest.fn();

describe('ButtonBackToTop', () => {
  it('should not be visible initially', () => {
    const { queryByLabelText } = render(<ButtonBackToTop />);
    const button = queryByLabelText('backTop');
    expect(button).toBeNull(); // Check if the button is initially null
  });
});
