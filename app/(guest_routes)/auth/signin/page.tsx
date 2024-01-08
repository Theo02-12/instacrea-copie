'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@material-tailwind/react';
import { filterFormikErrors } from '@/app/utils/formikHelpers';
import React from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as yup from 'yup';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const validationSchema = yup.object().shape({
	email: yup.string().email('Email invalide').required("L'email est requis"),
	password: yup
		.string()
		.min(8, "Le mot de passe doit être d'au moins 8 caractères")
		.required('Le mot de passe requis'),
});

export default function SignIn() {
	const router = useRouter();
	const { values, isSubmitting, touched, errors, handleSubmit, handleBlur, handleChange } =
		useFormik({
			initialValues: { email: '', password: '' },
			validationSchema,
			onSubmit: async (values) => {
				const signInRes = await signIn('credentials', {
					...values,
					redirect: false,
				});
				if (signInRes?.error === 'CredentialsSignin') {
					toast.error('Email ou mot de passe invalide', {
						position: toast.POSITION.TOP_RIGHT,
					});
				}

				if (!signInRes?.error) {
					router.refresh();
				}
			},
		});

	const errorsToRender = filterFormikErrors(errors, touched, values);

	type valueKeys = keyof typeof values;

	const { email, password } = values;
	const error = (name: valueKeys) => {
		return errors[name] && touched[name] ? true : false;
	};

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0'>
				{/* Left side */}
				<div className='flex flex-col justify-center p-8 md:p-14'>
					<span className='mb-3 text-4xl font-bold'>Instacréa</span>
					<span className='font-light text-gray-400 mb-8'>
						Veuillez entrer vos informations
					</span>
					<form onSubmit={handleSubmit}>
						<div className='py-4'>
							<span className='mb-2 text-md'>Email</span>
							<Input
								className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
								name='email'
								placeholder='Email'
								value={email}
								onChange={handleChange}
								onBlur={handleBlur}
								error={error('email')}
								crossOrigin=''
							/>
						</div>
						<div className='py-4'>
							<span className='mb-2 text-md'>Mot de passe</span>
							<Input
								className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
								name='password'
								placeholder='Mot de passe'
								value={password}
								onChange={handleChange}
								onBlur={handleBlur}
								type='password'
								error={error('password')}
								crossOrigin=''
							/>
						</div>
						<Button
							type='submit'
							className='w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300'
							disabled={isSubmitting}>
							Connexion
						</Button>
					</form>
					<div className='text-center text-gray-400'>
						Vous n&apos;avez pas encore de compte ?{' '}
						<span className='font-bold text-black'>
							<Link href='/auth/signup'>Inscription</Link>
						</span>
					</div>
					<div className=''>
						{errorsToRender.map((item) => {
							return (
								<div
									key={item}
									className='space-x-1 flex items-center text-red-500'>
									<XMarkIcon className='w-4 h-4' />
									<p className='text-xs'>{item}</p>
								</div>
							);
						})}
					</div>
				</div>
				{/* Right side */}
				<div className='relative'>
					<Image
						src='https://res.cloudinary.com/dlpesmj5y/image/upload/v1699013679/top-view-white-mug-box-hay_lqtsff.jpg'
						alt='img'
						width={400}
						height={400}
						className='w-[400px] h-full hidden rounded-r-2xl md:block object-cover'
					/>
				</div>
			</div>
		</div>
	);
}
