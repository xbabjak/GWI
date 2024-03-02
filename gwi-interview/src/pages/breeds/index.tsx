// find a way how to import styles globaly
import "../../styles/globals.css";

import React from "react";
import Link from "next/link";
import { CatBreedModal } from "@/components/CatBreedModal";
import { useBredsPage } from "./hooks/useBreedsPage";

const BreedsPage: React.FC = () => {
  const { breeds } = useBredsPage();

  return (
    <div className="m-2">
      <h1>List of breeds: </h1>
      <div className="grid">
        {breeds.map((breed, index) => (
          <Link
            key={index}
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            href={`breeds?id=${breed.id}`}
          >
            {breed.name}
          </Link>
        ))}
      </div>
      <CatBreedModal />
    </div>
  );
};

export default BreedsPage;
