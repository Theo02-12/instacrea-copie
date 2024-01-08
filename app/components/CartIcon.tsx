import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface CartNumber {
	cartItems: number;
}

export default function CartIcon({ cartItems }: CartNumber) {
	return (
		<Link
			className='bg-amber-500 w-8 h-8 lg:w-8 lg:h-8 flex items-center justify-center p-2 rounded-full relative'
			href='/cart'
		>
			<ShoppingCartIcon className='w-4 h-4' />
			<div className='absolute bg-gray-700 text-white lg:text-xs text-[9px] -top-2 -right-1 w-4 h-4 lg:w-6 lg:h-6 flex items-center justify-center rounded-full'>
				{cartItems}
			</div>
		</Link>
	);
}
