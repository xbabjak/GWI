import { CAT_API_BASE_URL, TEST_USER } from "@/constants";
import { api_key } from "@/keys";
import { CatData } from "@/types/CatData";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ERROR_CAT_DETAIL } from "../utils/constants";
import { UseCatDetailModalPropsType } from "../utils/types";

export const useCatBreedModal = ({ catId }: UseCatDetailModalPropsType) => {
  const router = useRouter();

  const { handleSubmit } = useForm<{}>();

  const [favoritedId, setFavoritedId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [catDetail, setCatDetail] = useState<CatData>();
  const [isCatDetailModalOpen, setIsCatDetailModalOpen] =
    useState<boolean>(false);

  const catBreeds = catDetail?.breeds;
  const isCatBreedSent = catBreeds?.length && catBreeds.length > 0;

  useEffect(() => {
    setIsCatDetailModalOpen(!!catId);
  }, [catId, setIsCatDetailModalOpen]);

  useEffect(() => {
    setCatDetail(undefined);

    async function fetchCatDetailData() {
      await axios
        .get(`${CAT_API_BASE_URL}/images/${catId}`)
        .then((res) => {
          setCatDetail(res.data);
        })
        .catch((err) => {
          setCatDetail(ERROR_CAT_DETAIL);
          console.error(err);
        });
    }
    if (catId) {
      fetchCatDetailData();
    }

    async function fetchIsFavourited() {
      await axios
        .get(
          `${CAT_API_BASE_URL}/favourites?image_id=${catId}&sub_id=${TEST_USER}`,
          {
            headers: {
              "content-type": "application/json",
              "x-api-key": api_key,
            },
          }
        )
        .then((res) => {
          setFavoritedId(res.data.length > 0 ? res.data[0].id : 0);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (catId) {
      fetchIsFavourited();
    }
  }, [catId, setCatDetail, setFavoritedId]);

  const closeModal = useCallback(() => {
    setFavoritedId(0);

    router.replace({
      query: {
        catId: "", // delete the query param
      },
    });
  }, [setFavoritedId]);

  const setAsFavourite: SubmitHandler<{}> = () => {
    setIsLoading(true);
    if (!favoritedId) {
      axios
        .post(
          `${CAT_API_BASE_URL}/favourites`,
          {
            image_id: catId,
            // change to random hash or a login
            sub_id: TEST_USER,
          },
          {
            headers: {
              "content-type": "application/json",
              "x-api-key": api_key,
            },
          }
        )
        .then((res) => {
          setFavoritedId(res.data.id);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      axios
        .delete(`https://api.thecatapi.com/v1/favourites/${favoritedId}`, {
          headers: {
            "content-type": "application/json",
            "x-api-key": api_key,
          },
        })
        .then(() => {
          setFavoritedId(0);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const onSubmit = handleSubmit(setAsFavourite);

  return {
    isLoading,
    isCatDetailModalOpen,
    catDetail,
    isCatBreedSent,
    favoritedId,
    onSubmit,
    closeModal,
  };
};
