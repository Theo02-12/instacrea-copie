import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CadeauxFemmes from '../../app/(shop)/(routes)/cadeaux-femmes/page';

describe('CadeauxFemmes Component', () => {
	it('should display the initial count', () => {
		render(<CadeauxFemmes />);
		expect(screen.getByTestId('count')).toHaveTextContent('Count: 0');
	});

	it('should increment the count when the button is clicked', () => {
		render(<CadeauxFemmes />);
		const button = screen.getByText('Increment');
		fireEvent.click(button);
		expect(screen.getByTestId('count')).toHaveTextContent('Count: 1');
	});

	it('should display the title "cadeaux femmes"', () => {
		render(<CadeauxFemmes />);
		expect(screen.getByText('cadeaux femmes')).toBeInTheDocument();
	});
});
