import React from 'react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from '@components/ui/sheet';
import Link from 'next/link';

interface Nav {
	button: React.ReactNode;
}

const DrawerNav = ({ button }: Nav) => {
	return (
		<Sheet>
			<SheetTrigger aria-label='Drawer' id='drawer'>{button}</SheetTrigger>
			<SheetContent side='left' className='bg-white'>
				<SheetHeader>
					<ul className='text-left'>
						<li className='p-3 pt-10'>
							<SheetClose asChild>
								<Link className='navbar__link__black relative' href='/'>
									Accueil
								</Link>
							</SheetClose>
						</li>

						<li className='p-3'>
							<SheetClose asChild>
								<Link
									className='navbar__link__black relative'
									href='/browse-collection/femme'
								>
									Femmes
								</Link>
							</SheetClose>
						</li>
						<li className='p-3'>
							<SheetClose asChild>
								<Link
									className='navbar__link__black relative'
									href='/browse-collection/homme'
								>
									Hommes
								</Link>
							</SheetClose>
						</li>
						<li className='p-3'>
							<SheetClose asChild>
								<Link className='navbar__link__black relative' href='/browse-collection/enfant'>
									Enfants
								</Link>
							</SheetClose>
						</li>
						<li className='p-3'>
							<SheetClose asChild>
								<Link
									className='navbar__link__black relative'
									href='/suivi-de-commande'
								>
									Suivre ma commande
								</Link>
							</SheetClose>
						</li>
						<li className='p-3'>
							<SheetClose asChild>
								<Link className='navbar__link__black relative' href='/contact'>
									Contact
								</Link>
							</SheetClose>
						</li>
					</ul>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default DrawerNav;
