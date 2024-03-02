import { api_key } from "@/keys";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FavouriteCatData } from "../types";
import { CAT_API_BASE_URL, TEST_USER } from "@/constants";

export const useFavouritesPage = () => {
  const [favouriteCats, setFavouriteCats] = useState<FavouriteCatData[]>([]);

  useEffect(() => {
    async function fetchCatsData() {
      await axios
        .get(
          `${CAT_API_BASE_URL}/favourites?limit=10&sub_id=${TEST_USER}&order=DESC`,
          {
            headers: {
              "content-type": "application/json",
              "x-api-key": api_key,
            },
          }
        )
        .then((res) => {
          setFavouriteCats(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchCatsData();
  }, []);

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
            console.log("favouriteCats", favouriteCats);
          })
          .catch((err) => console.error(err));
      }
      unfavouriteCat();
    },
    [favouriteCats, setFavouriteCats]
  );

  return { favouriteCats, unfavouriteCatImage };
};
