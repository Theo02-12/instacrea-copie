'use client';

import React, { useRef, useState } from 'react';
import SlickSlider, { Settings } from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
	images: string[];
}

const settings: Settings = {
	dots: false,
	lazyLoad: 'anticipated',
	infinite: true,
	speed: 100,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	autoplay: false,
	className: 'w-[300px] lg:w-[500px]',
};

// eslint-disable-next-line react/display-name
const SlickWithRef: React.FC<any> = React.forwardRef((props, ref) => {
	return React.createElement(SlickSlider as any, { ...props, ref: ref as any });
});

export default function ProductImageGallery({ images }: Props) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const slider = useRef<any>(null);

	return (
		<div className='w-full flex flex-col items-center'>
			<SlickWithRef
				{...settings}
				afterChange={(current: number) => {
					setCurrentSlide(current);
				}}
				ref={slider}
			>
				{images.map((img, index) => (
					<Image
						key={index}
						src={img}
						alt='testing'
						width='0'
						height='0'
						sizes='(max-width: 100%, height: auto)'
						priority={index === 0}
					/>
				))}
			</SlickWithRef>
			<div className='flex justify-center flex-wrap lg:justify-start py-2 space-x-2'>
				{images.map((img, index) => (
					<Image
						onClick={() => slider.current?.slickGoTo(index)}
						className={`${index === currentSlide ? 'ring ring-blue-500' : ''} m-1`}
						key={index}
						src={img}
						alt='testing'
						width={80}
						height={80}
						sizes='(max-width: 100%, height: auto)'
					/>
				))}
			</div>
		</div>
	);
}
