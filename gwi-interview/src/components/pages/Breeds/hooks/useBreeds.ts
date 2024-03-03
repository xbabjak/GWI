import { CAT_API_BASE_URL } from "@/constants";
import axios from "axios";
import { api_key } from "@/keys";
import { useEffect, useState } from "react";
import { Breed } from "../types";

export const useBreds = () => {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const url = `${CAT_API_BASE_URL}/breeds`;

      await axios
        .get(url, {
          headers: {
            "content-type": "application/json",
            "x-api-key": api_key,
          },
        })
        .then((response) => {
          const filteredBreeds = response.data.filter(
            (breed: Breed) => breed.image?.url !== null
          );
          setBreeds(filteredBreeds);
        })
        .catch((err) => {
          console.error("Error fetching data: ", err);
        });
    };

    fetchBreeds();
  }, [setBreeds]);

  return { breeds };
};
