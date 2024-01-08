import { auth } from "@/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import Footer from "@components/Footer";
import HeaderBand from "@components/HeaderBand";
import Navbar from "@components/navbar/index";
import MobileNavBar from "@components/mobNavbar/index";

interface Props {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: Props) {
  const session = await auth();
  if (!session) return redirect("/auth/signin");
  return (
    <>
      <HeaderBand />
      <Navbar />
      <MobileNavBar />
      {children}
      <Footer />
    </>
  );
}
