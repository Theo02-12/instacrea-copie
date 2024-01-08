'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { User, ShoppingBasket, LogOut, TruckIcon, Wrench } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

const ProfileNavBar = () => {
	const { data, status } = useSession();

	const [userInfo, setUserInfo] = useState({
		firstname: '',
		lastname: '',
	});

	useEffect(() => {
		// Assurez-vous que l'utilisateur est authentifié avant de faire la requête
		if (status === 'authenticated' && data?.user?.email) {
			fetch('/api/profile/get-infos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email: data.user.email }),
			})
				.then((res) => res.json())
				.then((dataUser) => {
					setUserInfo({
						firstname: dataUser.firstname,
						lastname: dataUser.lastname,
					});
				})
				.catch((error) => {
					console.log('Erreur lors de la récupération des informations.');
				});
		}
	}, [data, status]);

	return (
		<div className='flex flex-col w-full h-[500px]  md:w-1/3 lg:w-1/4 p-3 rounded-large my-3 md:mx-3 bg-[#f3f3f3] shadow'>
			<div className='flex flex-col items-center'>
				<h1 className='text-center text-2xl mb-3'>
					{userInfo.firstname} {userInfo.lastname}
				</h1>
				<button onClick={() => signOut()} className='flex my-5'>
					<LogOut /> Me déconnecter
				</button>
			</div>
			<div className='w-[90%] h-full '>
				<ul className='h-full flex flex-col justify-center'>
					<li className='py-3'>
						<Link href='/profil/informations' className='flex'>
							<User />
							&ensp; Mes informations
						</Link>
					</li>
					<li className='py-3'>
						<Link href='/profil/commandes' className='flex'>
							<ShoppingBasket /> &ensp;Mes commandes
						</Link>
					</li>
					<li className='py-3'>
						<Link href='/profil/commandes' className='flex'>
							<TruckIcon />
							&ensp; Suivre ma commande
						</Link>
					</li>
					<li className='py-3'>
						<Link href='/profil/commandes' className='flex'>
							<Wrench /> &ensp;Aide
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProfileNavBar;
