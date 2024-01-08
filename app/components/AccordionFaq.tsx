import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export const AccordionFaq = () => {
	return (
		<div className='p-4 w-[80%] md:w-full mx-auto my-5'>
			<h1 className='text-xl font-bold text-center my-3'>Questions/ Réponses</h1>
			<Accordion type='single' collapsible className='w-full'>
				<AccordionItem value='item-1'>
					<AccordionTrigger className='text-start'>
						Quels-sont les modes de paiement pris en charge ?{' '}
					</AccordionTrigger>
					<AccordionContent>
						Nous acceptons VISA, MasterCard, Paypal, Apple Pay ainsi que d&apos;autres
						méthodes mises à jour pour être disponibles sur la page de paiement de notre
						site Web
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-2'>
					<AccordionTrigger className='text-start'>
						Puis-je annuler ma commande ?
					</AccordionTrigger>
					<AccordionContent>
						Vous pouvez annuler votre commande avant que le produit ne soit expédié et
						vous recevrez un remboursement complet. Si le produit a déjà été expédié,
						nous ne pouvons pas annuler la commande
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-3'>
					<AccordionTrigger className='text-start'>
						Mon paiement est-il sécurisé ?
					</AccordionTrigger>
					<AccordionContent>
						YVotre paiement est sécurisé et vos informations restent toujours privées.
						Toutes les informations sont cryptées pour assurer la sécurité globale de
						toutes les informations sensibles.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-4'>
					<AccordionTrigger className='text-start'>
						{' '}
						Puis-je payer avec mon compte Paypal ?
					</AccordionTrigger>
					<AccordionContent>
						Bien entendu, Paypal est un mode de paiement accepté. 1. Sélectionnez PayPal
						comme mode de paiement lors du paiement. 2. Vous serez redirigé vers le site
						PayPal pour continuer le paiement. 3. Si vous êtes déjà client PayPal, vous
						pouvez vous connecter avec les données de l&apos;utilisateur et confirmer le
						paiement. Si vous n&apos;êtes pas familier avec PayPal, vous pouvez créer un
						compte PayPal et confirmer votre paiement. 4. Vous serez renvoyé à la page
						d&apos;accueil du shopping et votre commande et votre paiement seront
						effectués avec succès.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-5'>
					<AccordionTrigger className='text-start'>
						Puis-je retourner les marchandises si elles ont des problèmes de qualité ?
					</AccordionTrigger>
					<AccordionContent>
						Nous faisons de notre mieux pour garantir la qualité du produit à 100%. Si
						vous rencontrez des problèmes de qualité, vous pouvez retourner
						l&apos;article pour un remboursement complet. Nous prendrons en charge les
						frais de transport tant que la raison du retour de l&apos;article est due à
						des problèmes de qualité ou à une erreur de notre part.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-6'>
					<AccordionTrigger className='text-start'>
						Puis-je retourner un article sans aucun problème de qualité.
					</AccordionTrigger>
					<AccordionContent>
						Nous acceptons les retours pour quelque raison que ce soit jusqu&apos;à 30
						jours à compter de la date de réception de la marchandise. Cependant, vous
						devez supporter les frais de retour.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='item-7'>
					<AccordionTrigger className='text-start'>
						Est-ce que les produits sont d&apos;origine française ?
					</AccordionTrigger>
					<AccordionContent>
						Oui ! Tous nos produits sont fabriqués en France.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
