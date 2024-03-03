import { api_key } from "@/keys";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FavouriteCatData } from "../types";
import { CAT_API_BASE_URL, TEST_USER } from "@/constants";
import { API_LIMIT } from "../utils/constants";

export const useFavourites = () => {
  const [favouriteCats, setFavouriteCats] = useState<FavouriteCatData[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isDisabledLoadMoreButton, setIsDisabledLoadMoreButton] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onMorePagesClick = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  useEffect(() => {
    setIsLoading(true);

    async function fetchCatsData() {
      await axios
        .get(
          // &order=ASC
          `${CAT_API_BASE_URL}/favourites?limit=${API_LIMIT}&sub_id=${TEST_USER}&page=${pageNumber}`,
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
          setFavouriteCats((cats) => [...cats, ...res.data]);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    fetchCatsData();
  }, [setFavouriteCats, pageNumber, setIsDisabledLoadMoreButton, setIsLoading]);

  const unfavouriteCatImage = useCallback(
    (imageId: number) => {
      // use page =0-n attribute instead
      async function unfavouriteCat() {
        await axios
          .delete(`https://api.thecatapi.com/v1/favourites/${imageId}`, {
            headers: {
              "content-type": "application/json",
              "x-api-key": api_key,
            },
          })
          .then(() => {
            setFavouriteCats(favouriteCats.filter((cat) => cat.id !== imageId));
          })
          .catch((err) => console.error(err));
      }
      unfavouriteCat();
    },
    [favouriteCats, setFavouriteCats]
  );

  return {
    favouriteCats,
    isDisabledLoadMoreButton,
    unfavouriteCatImage,
    onMorePagesClick,
    isLoading,
  };
};
