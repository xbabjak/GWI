import { CAT_API_BASE_URL, TEST_USER } from "@/constants";
import { api_key } from "@/keys";
import { CatData } from "@/types/CatData";
import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ERROR_CAT_DETAIL } from "../utils/constants";
import { FavouriteUpdateStatus } from "../utils/enums";

export const useCatBreedModal = ({ catId }: { catId?: string }) => {
  const router = useRouter();

  const { handleSubmit } = useForm<{}>();

  const [isFavourited, setIsFavourited] = useState<boolean>(false);

  const [catDetail, setCatDetail] = useState<CatData>();
  const [isCatDetailModalOpen, setIsCatDetailModalOpen] =
    useState<boolean>(false);
  const [favouriteUpdateStatus, setFavouriteUpdateStatus] =
    useState<FavouriteUpdateStatus>(FavouriteUpdateStatus.uncalled);

  const catBreeds = catDetail?.breeds;
  const isCatBreedSent = catBreeds?.length && catBreeds.length > 0;
  // const catBreedIds = catBreeds?.map((breed) => breed.id).join(", "); - use pagination instead

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
    fetchCatDetailData();

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
          setIsFavourited(res.data.length > 0);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchIsFavourited();
  }, [catId, setIsFavourited, setCatDetail]);

  const closeModal = useCallback(() => {
    setFavouriteUpdateStatus(FavouriteUpdateStatus.uncalled);
    setIsFavourited(false);

    router.replace({
      query: {
        catId: "", // delete the query param
      },
    });
  }, [setFavouriteUpdateStatus]);

  const setAsFavourite: SubmitHandler<{}> = () => {
    //maybe remake into post/delete based on isFavoured
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
      .then(() => {
        setFavouriteUpdateStatus(FavouriteUpdateStatus.success);
        setIsFavourited(true);
      })
      .catch((err) => {
        setFavouriteUpdateStatus(FavouriteUpdateStatus.error);
        console.error(err);
      });
  };

  const onSubmit = handleSubmit(setAsFavourite);

  return {
    isCatDetailModalOpen,
    catDetail,
    isCatBreedSent,
    isFavourited,
    favouriteUpdateStatus,
    onSubmit,
    closeModal,
  };
};
