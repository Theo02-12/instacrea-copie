import { Input } from "./ui/input";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const params = useSearchParams();
  const searchQuery = params.get("query") || "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!query) return;
        router.push(`/products/search?query=${query}`);
      }}
      className="w-full md:w-72"
    >
      <div className="relative">
        <Input
          placeholder="Recherche"
          className="rounded border-gray-300"
          value={query || searchQuery}
          onChange={({ target }) => setQuery(target.value)}
        />
        <span className="absolute right-2 top-2">
          <Search className="text-gray-400"/>
        </span>
      </div>
    </form>
  );
}
