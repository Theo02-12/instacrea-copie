import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

// components

import Notification from './components/Notification';
import AuthSession from './components/AuthSession';

const inter = Montserrat({
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Personnalisation de Cadeaux uniques | Instacréa - Créez des Souvenirs Inoubliables',
	description:
		"Découvrez Instacréa, votre destination pour des cadeaux personnalisés uniques. Transformez vos idées en souvenirs inoubliables avec notre large gamme d'options de personnalisation. Explorez notre boutique aujourd'hui.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthSession>
			<html lang='fr'>
				<body className={inter.className}>
					{children}
					<Notification />
				</body>
			</html>
		</AuthSession>
	);
}
