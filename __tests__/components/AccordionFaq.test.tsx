import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccordionFaq } from '@components/AccordionFaq';

describe('AccordionFaq Component', () => {
	it('should render all accordion items', () => {
		render(<AccordionFaq />);

		const items = [
			'Quels-sont les modes de paiement pris en charge ?',
			'Puis-je annuler ma commande ?',
			'Mon paiement est-il sécurisé ?',
			'Puis-je payer avec mon compte Paypal ?',
			'Puis-je retourner les marchandises si elles ont des problèmes de qualité ?',
			'Puis-je retourner un article sans aucun problème de qualité.',
			"Est-ce que les produits sont d'origine française ?",
		];

		items.forEach((item) => {
			expect(screen.getByText(item)).toBeInTheDocument();
		});
	});

	it('should collapse accordion content when trigger is clicked again', () => {
		// Render the AccordionFaq component
		render(<AccordionFaq />);

		// Get the trigger button for the first question
		const trigger = screen.getByText('Quels-sont les modes de paiement pris en charge ?');

		// Click the trigger to expand the content
		fireEvent.click(trigger);

		// Assert that the content is visible after clicking the trigger
		const contentText =
			"Nous acceptons VISA, MasterCard, Paypal, Apple Pay ainsi que d'autres méthodes mises à jour pour être disponibles sur la page de paiement de notre site Web";

		// Declare the type for content
		let content: HTMLElement | null = screen.getByText(contentText);
		expect(content).toBeVisible();

		// Click the trigger again to collapse the content
		fireEvent.click(trigger);

		// Assert that the content is either not present or if it's present, it's not visible
		content = screen.queryByText(contentText);
		if (content) {
			expect(content).not.toBeVisible();
		} else {
			expect(content).toBeNull();
		}
	});
});
