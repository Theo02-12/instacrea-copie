'use client';
import React from 'react';
import { Button, Input } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { filterFormikErrors } from '@/app/utils/formikHelpers';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const validationSchema = yup.object().shape({
	lastname: yup.string().required('Le nom est requis!'),
	firstname: yup.string().required('Le prénom est requis!'),
	email: yup.string().email('Email invalide').required("L'email est requis!"),
	password: yup
		.string()
		.min(8, 'Le mot de passe doit contenir au moins 8 caractères')
		.required('Le mot de passe est requis!'),
});

export default function SignUp() {
	const router = useRouter();
	const { values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched } =
		useFormik({
			initialValues: { lastname: '', firstname: '', email: '', password: '' },
			validationSchema,
			onSubmit: (values, action) => {
				action.setSubmitting(true);
				fetch('/api/users', {
					method: 'POST',
					body: JSON.stringify(values),
				}).then(async (res) => {
					if (res.ok) {
						const result = await res.json();
						toast.success('Inscription Réussie !', {
							position: toast.POSITION.TOP_RIGHT,
						});
						router.push('/auth/signin');
					}
					action.setSubmitting(false);
				});
			},
		});

		const errorsToRender = filterFormikErrors(errors, touched, values);

	const { lastname, firstname, email, password } = values;

	type valueKeys = keyof typeof values;
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
							<span className='mb-2 text-md'>Nom</span>

							<Input
							className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
								name='lastname'
								placeholder='Nom'
								onBlur={handleBlur}
								onChange={handleChange}
								value={lastname}
								error={error('lastname')}
								crossOrigin=''
							/>
							</div>
							<div className='py-4'>
							<span className='mb-2 text-md'>Prénom</span>
							<Input
							className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
								name='firstname'
								placeholder='Prénom'
								onBlur={handleBlur}
								onChange={handleChange}
								value={firstname}
								error={error('firstname')}
								crossOrigin=''
							/>
							</div>
							<div className='py-4'>
							<span className='mb-2 text-md'>Email</span>
							<Input
							className='w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500'
								name='email'
								placeholder='Email'
								onBlur={handleBlur}
								onChange={handleChange}
								value={email}
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
								type='password'
								onChange={handleChange}
								onBlur={handleBlur}
								value={password}
								error={error('password')}
								crossOrigin=''
							/>
							</div>
							<Button
							type='submit'
							className='w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300'
							disabled={isSubmitting}>
							Inscription
						</Button>
						</form>
						<div className='text-center text-gray-400'>
						Vous avez déjà un compte ?{' '}
						<span className='font-bold text-black'>
						<Link href='/auth/signin'>Connexion</Link>
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
