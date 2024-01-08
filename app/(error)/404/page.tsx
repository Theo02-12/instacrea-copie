import Link from "next/link";
import React from "react";

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <h1 className='font- font-bold text-[200px] bg-[url("/bg.jpg")] text-transparent bg-clip-text bg-cover bg-no-repeat overflow-hidden'>
        Oops !
      </h1>
      <p className="font-bold text-[30px]">ERREUR 404 - PAGE NON TROUVEE</p>
      <Link href="/" className="p-3 bg-[#0046d5] text-white rounded-full my-4 shadow-[0_4px_15px_-5px_#0046d5]">
        Retourner à l&apos;accueil
      </Link>
    </div>
  );
}
