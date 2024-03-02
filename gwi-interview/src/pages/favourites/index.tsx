import { api_key } from "@/keys";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FavouriteCatData } from "./types";
import "../../styles/globals.css";
import { CAT_API_BASE_URL } from "@/constants";

const FavouritesPage = () => {
  const [favouriteCats, setFavouriteCats] = useState<FavouriteCatData[]>([]);

  useEffect(() => {
    async function fetchCatsData() {
      try {
        const res = await axios.get(
          `${CAT_API_BASE_URL}/favourites?limit=10&sub_id=user1&order=DESC`,
          {
            headers: {
              "content-type": "application/json",
              "x-api-key": api_key,
            },
          }
        );
        setFavouriteCats(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCatsData();
  }, []);

  const unfavouriteCatImage = useCallback(
    (imageId: string) => {
      // use page =0-n attribute instead
      async function unfavouriteCat() {
        await axios
          .get(`${CAT_API_BASE_URL}/images/search?limit=10`, {
            headers: {
              "x-api-key": api_key,
            },
          })
          .then(() =>
            setFavouriteCats(
              favouriteCats.filter((cat) => cat.image.id !== imageId)
            )
          )
          .catch((err) => console.error(err));
      }
      unfavouriteCat();
    },
    [favouriteCats, setFavouriteCats]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-between">
        {favouriteCats.map((cat) => (
          <>
            <div key={cat.image.id} className="col col-lg">
              <Image
                src={cat.image.url}
                alt={cat.image.url}
                height={350}
                width={350}
              />
            </div>
            {/* toto by mal byt form */}
            {/* sprav to, ze ak hovernes na obrazok, tak sa ukaze "X" */}
            <button
              key={cat.image.id}
              className="pr-10"
              // className="mx-auto w-full"
              onClick={() => unfavouriteCatImage(cat.image.id)}
            >
              <p className="text-red-700 "> X </p>
            </button>
          </>
        ))}
      </div>
      {/* button to fetch more onClick */}
      <button> Load more </button>
    </div>
  );
};

export default FavouritesPage;
