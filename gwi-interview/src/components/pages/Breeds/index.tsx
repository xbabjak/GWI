import React from "react";
import Link from "next/link";
import { CatBreedModal } from "@/components/CatBreedModal";
import { useBreds } from "./hooks/useBreeds";
import { BreedsPropsType } from "./types";

const Breeds = ({ breedId }: BreedsPropsType) => {
  const { breeds } = useBreds();

  return (
    <div className="m-2">
      <h1 className="text-3xl"> List of breeds: </h1>
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
      <CatBreedModal breedId={breedId} />
    </div>
  );
};

export default Breeds;
