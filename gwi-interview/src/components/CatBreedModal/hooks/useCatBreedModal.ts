import { CAT_API_BASE_URL } from "@/constants";
import { api_key } from "@/keys";
import { CatData } from "@/types/CatData";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { ERROR_CAT_BREED } from "../constants";

export const useCatBreedModal = () => {
  const router = useRouter();

  const [catBreed, setCatBreed] = useState<CatData[]>();
  const [isCatBreedModalOpen, setIsCatBreedModalOpen] =
    useState<boolean>(false);

  const closeModal = useCallback(() => {
    router.replace({
      query: {
        id: "", // delete the query param
      },
    });
  }, [router]);

  useEffect(() => {
    const { id } = router.query;
    setIsCatBreedModalOpen(!!id);
  }, [router, router.isReady, setIsCatBreedModalOpen]);

  useEffect(() => {
    // move breed id retrieving to page component
    const { id } = router.query;
    setCatBreed(undefined);

    async function fetchCatBreedData() {
      await axios
        .get(`${CAT_API_BASE_URL}/images/search?breed_ids=${id}&limit=10`, {
          headers: {
            "content-type": "application/json",
            "x-api-key": api_key,
          },
        })
        .then((res) => {
          setCatBreed(res.data);
        })
        .catch((err) => {
          setCatBreed([ERROR_CAT_BREED]);
          console.error(err);
        });
    }
    fetchCatBreedData();
  }, [router, router.isReady, setCatBreed]);

  return { catBreed, isCatBreedModalOpen, closeModal };
};
