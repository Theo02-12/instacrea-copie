import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Google from '../public/logo-google.svg';

interface GoogleSignInButtonProps {
	children: ReactNode;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
	const loginWithGoogle = () => console.log('login with google');

	return (
		<Button onClick={loginWithGoogle} className='w-full border'>
			<div className='flex items-center justify-center'>
				<Image src={Google} alt='google' width={20} height={20} />
				{children}
			</div>
		</Button>
	);
};

export default GoogleSignInButton;
