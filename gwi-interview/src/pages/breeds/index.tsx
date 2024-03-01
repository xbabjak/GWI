// find a way how to import styles globaly
import "../../styles/globals.css";

import { api_key } from "@/keys";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CatBreedModal } from "@/components/CatBreedModal";
import { Breed } from "./types";

const BreedsPage: React.FC = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const url = `https://api.thecatapi.com/v1/breeds`;

      try {
        const response = await fetch(url, {
          headers: {
            "x-api-key": api_key,
          },
        });
        const data: Breed[] = await response.json();
        const filteredBreeds = data.filter(
          (breed) => breed.image?.url !== null
        );
        setBreeds(filteredBreeds);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchBreeds();
  }, []);

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
