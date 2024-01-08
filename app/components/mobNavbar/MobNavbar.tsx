'use client';

import React from 'react';

import { Menu, Search } from 'lucide-react';
import SearchComponent from '../SearchComponent';
import DrawerNav from '../DrawerNav';
import CartIcon from '../CartIcon';
import ProfileMenu from '../ProfileMenu';
import { menuItems } from '../navbar/NavUI';
import useAuth from '@hooks/useAuth';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import CartItems from '../CartItems';

interface Props {
	cartItems: number;
	src: string
}

const MobNavbar = ({src, cartItems}: Props) => {
	const { loggedIn } = useAuth();		

	return (
		<div className='lg:hidden fixed bottom-0 w-full bg-[#11131F] left-[50%] -translate-x-[50%] max-w-[1100px] mob_navbar px-8 z-10 border-t border-[#304384] border-opacity-70'>
			<div className='flex justify-between text-[28px] text-[#D6E1FF] py-2'>
				<DrawerNav button={<Menu />} />

				<div className='flex text-[#1F2D5C] justify-center items-center cursor-pointer relative'>
					<CartIcon cartItems={cartItems} />
				</div>

				<SearchComponent button={<Search />} />

				{loggedIn ? (
					<ProfileMenu menuItems={menuItems} src={src}/>
				) : (
					<div className='text-[#D6E1FF] ml-2'>
						<Link href='/auth/signin'>
							<UserCircle size={32} />
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default MobNavbar;
