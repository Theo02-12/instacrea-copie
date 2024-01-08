import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AuthFormContainer from '@components/AuthFormContainer';

describe('AuthFormContainer', () => {
  it('renders correctly with title and children', () => {
    const title = 'Login Form';
    const onSubmitMock = jest.fn();

    const { getByText, getByTestId } = render(
      <AuthFormContainer title={title} onSubmit={onSubmitMock}>
        <div data-testid="child-element">Child Element</div>
      </AuthFormContainer>
    );

    // Assert that the title is rendered
    expect(getByText(title)).toBeInTheDocument();

    // Assert that the child element is rendered
    expect(getByTestId('child-element')).toBeInTheDocument();
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmitMock = jest.fn();

    const { getByTestId } = render(
      <AuthFormContainer title="Login Form" onSubmit={onSubmitMock}>
        <div data-testid="child-element">Child Element</div>
      </AuthFormContainer>
    );

    // Simulate form submission
    fireEvent.submit(getByTestId('auth-form'));

    // Assert that onSubmit is called
    expect(onSubmitMock).toHaveBeenCalled();
  });
});
