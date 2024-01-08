import { auth } from '@/auth';
import React, { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import HeaderBand from '../components/HeaderBand';
import NavUI from '../components/navbar/NavUI';
import Footer from '../components/Footer';
import MobileNavBar from '../components/mobNavbar';
import FirstFooter from '../components/FirstFooter';
import ButtonBackToTop from '../components/ButtonBackToTop';

interface Props {
  children: ReactNode;
  cartItems: number;
  src: string;
}

export default async function GuestLayout({ children, src }: Props) {
  const session = await auth();
  if (session) return redirect('/');
  return (
    <div>
      <HeaderBand />
      <NavUI cartItems={0} src={src} />
      <MobileNavBar />
      {children}
      <FirstFooter />
      <ButtonBackToTop />
      <Footer />
    </div>
  );
}
