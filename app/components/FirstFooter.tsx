import Image from 'next/image';
import Shipping from '../../public/instacreashipping.png';
import Secure from '../../public/instacreasecurepayment.png';
import Support from '../../public/instacreamailsupport.png';
import Return from '../../public/instacreaeturns.png';

const FirstFooter = () => {
	return (
		<div className='w-full h-full bg-[#F7F9FF] p-2 md:flex md:justify-around px-8 items-center text-center grid grid-cols-2'>
			<div className='flex flex-col items-center justify-center border border-[#304384] border-opacity-30 md:border-none h-full'>
				<Image src={Shipping} width={75} height={75} alt='Shipping' />
				<p className='font-bold text-[#1F2D5C]'>LIVRAISON</p>
				<p className='my-3 hidden md:block text-[#1F2D5C]'>Livraison Suivi Colissimo OFFERTE</p>
			</div>
			<div className='flex flex-col items-center justify-center border border-[#304384] border-opacity-30 md:border-none'>
				<Image src={Secure} width={75} height={75} alt='Secure' />
				<p className='font-bold text-[#1F2D5C]'>PAIEMENT SÉCURISÉ</p>
				<p className='my-3 hidden md:block text-[#1F2D5C]'>Paiements en ligne 100% Sécurisés</p>
			</div>
			<div className='flex flex-col items-center justify-center border border-[#304384] border-opacity-30 md:border-none'>
				<Image src={Support} width={75} height={75} alt='Support' />
				<p className='font-bold text-[#1F2D5C]'>SUPPORT</p>
				<p className='my-3 hidden md:block text-[#1F2D5C]'>Nous répondons à toutes vos questions</p>
			</div>
			<div className='flex flex-col items-center justify-center border border-[#304384] border-opacity-30 md:border-none'>
				<Image src={Return} width={75} height={75} alt='Return' />
				<p className='font-bold text-[#1F2D5C]'>RETOURS</p>
				<p className='my-3 hidden md:block text-[#1F2D5C]'>Satisfait ou Remboursé pendant 30 jours</p>
			</div>
		</div>
	);
};

export default FirstFooter;
