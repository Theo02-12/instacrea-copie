import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminSidebar from '../../app/components/AdminSidebar';

// Mock the SignOutButton component
jest.mock('../../app/components/SignOutButton', () => {
	return {
		__esModule: true,
		default: jest.fn(() => <div>Mock SignOutButton</div>),
	};
});

describe('AdminSidebar Component', () => {
	it('should render the AdminSidebar component', () => {
		render(<AdminSidebar children={<div>Test Children</div>} />);
		expect(screen.getByText('Instacréa')).toBeInTheDocument();
		expect(screen.getByText('Tableau de bord')).toBeInTheDocument();
		expect(screen.getByText('Utilisateurs')).toBeInTheDocument();
		expect(screen.getByText('Produits')).toBeInTheDocument();
		expect(screen.getByText('Vedettes')).toBeInTheDocument();
		expect(screen.getByText('Ventes')).toBeInTheDocument();
		expect(screen.getByText('Commandes')).toBeInTheDocument();
		expect(screen.getByText('Mock SignOutButton')).toBeInTheDocument();
		expect(screen.getByText('Test Children')).toBeInTheDocument();
	});
});
