'use client';

import React, { FormEvent } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

const navRoutes = [
	{
		label: 'Accueil',
		href: '/',
	},
	{
		label: 'Femmes',
		href: '/browse-collection/femme',
	},
	{
		label: 'Hommes',
		href: '/browse-collection/homme',
	},
	{
		label: 'Enfants',
		href: '/browse-collection/enfant',
	},
];

const linkRoutes = [
	{
		label: 'Contact',
		href: '/contact',
	},
	{
		label: 'Qui sommes-nous',
		href: '/qui-sommes-nous',
	},
	{
		label: 'Conditions générales de ventes',
		href: '/cgv',
	},
	{
		label: 'Mention légales',
		href: '/mention-legales',
	},
	{
		label: 'Politique de retour et remboursement',
		href: '/retour-et-remboursement',
	},
	{
		label: 'Politique de confidentialité',
		href: '/politique-de-confidentialite',
	},
];

const Footer = () => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
	};

	return (
		<div className='w-full bg-[#11131F] text-[#D6E1FF] z-0 p-4'>
			<div className='flex flex-wrap md:justify-around md:flex-row p-4'>
				<div className='md:w-1/5 m-3 md:m-1 flex justify-center w-full md:block'>
					<Link href='/'>
						<Image
							className='flex justify-center items-center'
							src='https://res.cloudinary.com/dlpesmj5y/image/upload/v1696165329/logo_b7yvpd.png'
							alt='logo'
							width={200}
							height={75}
							style={{ width: '200px', height: 'auto' }}
							loading='eager'
							priority={true}
						/>
					</Link>
				</div>

				{/* accordéon en mode mobile pour les liens de navigation */}

				<Accordion type='single' collapsible className='md:hidden w-full m-3'>
					<AccordionItem value='item-1'>
						<AccordionTrigger>Navigation</AccordionTrigger>
						<AccordionContent>
							<ul className=''>
								{navRoutes.map((route, index) => (
									<li key={index} className='py-1 hover:text-gray-500'>
										<Link href={route.href} className='navbar__link relative'>
											{route.label}
										</Link>
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* liens de navigation */}

				<div className='md:w-1/4 m-3 md:m-1 hidden md:block'>
					<h3 className='font-bold pb-2 text-xl'>Navigation</h3>
					<ul className=''>
						{navRoutes.map((route, index) => (
							<li key={index} className='py-1 hover:text-gray-500'>
								<Link href={route.href} className='navbar__link relative'>
									{route.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* accordéon en mode mobile pour les liens utiles*/}

				<Accordion type='single' collapsible className='md:hidden w-full m-3'>
					<AccordionItem value='item-1'>
						<AccordionTrigger>Lien Utiles</AccordionTrigger>
						<AccordionContent>
							<ul className=''>
								{linkRoutes.map((route, index) => (
									<li key={index} className='py-1 hover:text-gray-500'>
										<Link href={route.href} className='navbar__link relative'>
											{route.label}
										</Link>
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* liens utiles*/}
				<div className='md:w-1/4 m-3 md:m-1 hidden md:block'>
					<h3 className='font-bold pb-2 text-xl '>Lien Utiles</h3>
					<ul className=''>
						{linkRoutes.map((route, index) => (
							<li key={index} className='py-1 hover:text-gray-500'>
								<Link href={route.href} className='navbar__link relative'>
									{route.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* accordéon pour la newletters en mode mobile */}

				<Accordion type='single' collapsible className='md:hidden w-full m-3'>
					<AccordionItem value='item-1'>
						<AccordionTrigger>Newletters</AccordionTrigger>
						<AccordionContent>
							<p>
								Envie de recevoir des nouvelles et bons plans cadeaux?
								Inscrivez-vous à notre newsletter.{' '}
								<span className='font-bold'>Promis, on ne vous spammera pas</span>
							</p>
							<form onSubmit={handleSubmit}>
								<Input
									type='email'
									placeholder='Entrez votre email'
									className='w-48 lg:w-64 my-2'
									name='email'
								/>
								<Button className='bg-[#c7c7c7] text-black rounded hover:text-white'>
									Inscription
								</Button>
							</form>
						</AccordionContent>
					</AccordionItem>
				</Accordion>

				{/* newletters */}
				<div className='md:w-1/4 m-3 md:m-1 hidden md:block'>
					<h3 className='font-bold pb-2 text-xl'>Newletters</h3>
					<p>
						Envie de recevoir des nouvelles et bons plans cadeaux? Inscrivez-vous à
						notre newsletter.{' '}
						<span className='font-bold'>Promis, on ne vous spammera pas</span>
					</p>
					<form onSubmit={handleSubmit}>
						<Input
							type='email'
							placeholder='Entrez votre email'
							className='w-48 lg:w-64 my-2'
							name='email'
						/>
						<Button className='bg-[#c7c7c7] text-black rounded hover:text-white'>
							Inscription
						</Button>
					</form>
				</div>
			</div>

			{/* copyright et moyens de paiements */}
			<div className='flex  mb-14 lg:m-0 px-8 py-4 flex-col sm:flex-row sm:justify-between text-center sm:text-left justify-center items-center '>
				{/* logo du site*/}
				<div className='sm:w-1/3'>
					<h3 className='font-bold'>2023 Instacréa</h3>
				</div>
				<div className='sm:w-1/3 text-center'>
					<p className='my-2 '>
						Réalisé par{' '}
						<Link href='/portfolio-ludo' className='navbar__link relative'>
							Expert Digital
						</Link>
					</p>
				</div>

				{/* logo des moyens de paiements*/}
				<div className='flex sm:w-1/3 sm:justify-end justify-center'>
					<Instagram />
					<Facebook />
				</div>
			</div>
		</div>
	);
};

export default Footer;
