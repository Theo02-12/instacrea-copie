"use client";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchProps {
  button: any;
}

const SearchComponent = ({ button }: SearchProps) => {
  const [query, setQuery] = useState("");
  const router = useRouter()

  return (
    <Sheet>
      <SheetTrigger aria-label="search">{button}</SheetTrigger>
      <SheetContent className="bg-[#000000]" side="top">
        <SheetHeader>
          <SheetTitle className="text-center text-[#c1c1c1]">
            Rechercher un article
          </SheetTitle>
          <div className="w-full sm:w-[300px] md:w-[70%] mx-auto text-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!query) return;
                router.push(`/search?query=${query}`);
              }}
            >
              <input
                className="border-[#c7c7c7] border p-2 px-4 rounded-lg w-full bg-[#c7c7c7] text-[#030115]"
                type="text"
                placeholder="Entrez le nom du produit ici ..."
                onChange={({ target }) => setQuery(target.value)}
                value={query}
              />
            </form>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchComponent;
