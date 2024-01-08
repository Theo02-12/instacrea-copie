import React from 'react';

const HeaderBand = () => {
	return (
		<div className='py-3 flex w-full justify-center border-b bg-[#11131F] border-[#304384] border-opacity-70'>
			<div className='flex justify-center text-[#D6E1FF]'>
				<p className='flex flex-nowrap text-center'>
					{' '}
					Livraison &thinsp;<b>OFFERTE</b>&thinsp; à partir de 30€ !
				</p>
			</div>
		</div>
	);
};

export default HeaderBand;
