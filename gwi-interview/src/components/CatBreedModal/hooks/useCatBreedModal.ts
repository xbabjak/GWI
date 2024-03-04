import { CAT_API_BASE_URL } from "@/constants";
import { api_key } from "@/keys";
import { CatData } from "@/types/CatData";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { API_LIMIT, ERROR_CAT_BREED } from "../constants";

export const useCatBreedModal = ({ breedId }: { breedId?: string }) => {
  const router = useRouter();

  const [catBreed, setCatBreed] = useState<CatData[]>([]);
  const [isCatBreedModalOpen, setIsCatBreedModalOpen] =
    useState<boolean>(false);

  const [pageNumber, setPageNumber] = useState(0);
  const [isDisabledLoadMoreButton, setIsDisabledLoadMoreButton] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onMorePagesClick = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  const closeModal = useCallback(() => {
    setCatBreed([]);
    setIsDisabledLoadMoreButton(false);
    setPageNumber(0);

    router.replace({
      query: {
        id: "", // delete the query param
      },
    });
  }, [router]);

  useEffect(() => {
    setIsCatBreedModalOpen(!!breedId);
  }, [breedId, setIsCatBreedModalOpen]);

  useEffect(() => {
    setIsLoading(true);

    async function fetchCatBreedData() {
      // there seems to be an issue with pagination of this API
      // the documentation for this API has been down as 'Page Not Found' error
      // unable to find the correct documentation I have been guessing how it works
      // https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=gpN-ReBkp
      await axios
        .get(
          `${CAT_API_BASE_URL}/images/search?breed_ids=${breedId}&limit=${API_LIMIT}&page=${pageNumber}`,
          {
            headers: {
              "content-type": "application/json",
              "x-api-key": api_key,
            },
          }
        )
        .then((res) => {
          if (res.data.length < API_LIMIT) {
            setIsDisabledLoadMoreButton(true);
          }
          // remove duplicates
          // maybe ...cats not even needed
          setCatBreed((cats) => [...cats, ...res.data]);
        })
        .catch((err) => {
          setCatBreed([ERROR_CAT_BREED]);
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (breedId) {
      fetchCatBreedData();
    }
  }, [breedId, setCatBreed, pageNumber]);

  return {
    catBreed,
    isCatBreedModalOpen,
    isDisabledLoadMoreButton,
    onMorePagesClick,
    closeModal,
    isLoading,
  };
};
