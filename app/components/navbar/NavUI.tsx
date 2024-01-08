'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@material-tailwind/react';
import { Search, UserCircle } from 'lucide-react';
import ProfileMenu from '../ProfileMenu';
import CartIcon from '../CartIcon';
import SearchComponent from '../SearchComponent';
import { UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
// import Image
import Image from 'next/image';
import useAuth from '@hooks/useAuth';

export const menuItems = [
	{
		href: '/profil',
		icon: <UserCircleIcon className='h-4 w-4' />,
		label: 'Mon profil',
	},
	{
		href: '/profil/orders',
		icon: <ShoppingBagIcon className='h-4 w-4' />,
		label: 'Mes commandes',
	},
];

// create routes
const routes = [
	{
		label: 'Accueil',
		href: '/',
	},
	{
		label: 'Hommes',
		href: '/browse-collection/homme',
	},
	{
		label: 'Femmes',
		href: '/browse-collection/femme',
	},
	{
		label: 'Enfants',
		href: '/browse-collection/enfant',
	},
	{
		label: 'Suivre ma commande',
		href: '/suivi-de-commande',
	},
	{
		label: 'Contact',
		href: '/contact',
	},
];

interface Props {
	cartItems: number;
	src: string;
}

export default function NavUI({ cartItems, src }: Props) {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [isCartOpen, setCartOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isScrolling, setIsScrolling] = useState(false);
	const { loading, loggedIn } = useAuth();

	const handleCartClick = () => {
		setCartOpen(!isCartOpen);
	};

	React.useEffect(() => {
		const onResize = () => window.innerWidth >= 960 && setOpen(false);
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		let prevScrollPos = window.scrollY;

		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			if (currentScrollPos === 0) {
				setIsScrolling(false);
			} else {
				setIsScrolling(true);
			}
			const isScrollingDown = currentScrollPos > prevScrollPos;

			setIsVisible(!isScrollingDown);

			prevScrollPos = currentScrollPos;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<div
				className={`border-b border-[#9EB1FF]  
        ${isVisible ? 'sticky w-full top-0' : '-translate-y-full'}
        ${isScrolling ? '' : 'translate-y-0'}
       z-10 bg-[#11131F] border-b-[#9EB1FF] border-opacity-70 transition-all ease-in-out duration-300`}
			>
				<div className='sm:flex justify-center items-center'>
					<div className='flex justify-center items-center '>
						<Link href='/' passHref>
							<Image
								className='cursor-pointer'
								src='https://res.cloudinary.com/dlpesmj5y/image/upload/v1696165329/logo_b7yvpd.png'
								alt='logo'
								width={250}
								height={75}
								style={{ width: '150px', height: 'auto' }}
								loading='eager'
								priority={true}
							/>
						</Link>
					</div>
					<div className='hidden lg:block bg-[#11131F] text-[#D6E1FF] '>
						<div className='container'>
							<div className='flex w-fit gap-10 mx-auto font-medium py-4 text-blackish'>
								<div>
									{routes.map((route, index) => (
										<Link
											href={route.href}
											key={route.href}
											className={cn(
												'navbar__link relative',
												pathname === route.href && 'active'
											)}
											style={{
												marginRight:
													index < routes.length - 1 ? '1rem' : '0',
											}}
										>
											{route.label}
										</Link>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className='hidden lg:flex gap-2 items-center'>
						<CartIcon cartItems={cartItems} />
						{loggedIn ? (
							<ProfileMenu menuItems={menuItems} src={src} />
						) : loading ? (
							<Spinner />
						) : (
							<>
								<div className='text-[#D6E1FF] ml-2'>
									<Link href='/auth/signin'>
										<UserCircle size={32} />
									</Link>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<div className='lg:hidden'>
				<div className='px-4 hidden lg:flex gap-4 text-[#D6E1FF] text-[30px]'>
					<SearchComponent button={<Search />} />
					<div className='relative '>
						<div
							onClick={handleCartClick}
							className='flex justify-center items-center cursor-pointer'
						></div>
					</div>
				</div>
			</div>
		</>
	);
}
