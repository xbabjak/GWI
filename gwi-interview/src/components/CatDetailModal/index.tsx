import ReactModal from "react-modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CatData } from "@/types/CatData";
import Link from "next/link";
import { ERROR_CAT_DETAIL } from "./constants";
import { api_key } from "@/keys";
import { useForm, SubmitHandler } from "react-hook-form";

enum FavoriteUpdateStatus {
  loading,
  success,
  error,
}

export const CatDetailModal = () => {
  const router = useRouter();

  const { handleSubmit } = useForm<{}>();

  const [catDetail, setCatDetail] = useState<CatData>();
  const [isCatDetailModalOpen, setIsCatDetailModalOpen] =
    useState<boolean>(false);
  const [favoriteUpdateStatus, setFavoriteUpdateStatus] =
    useState<FavoriteUpdateStatus>(FavoriteUpdateStatus.success);

  const catBreeds = catDetail?.breeds;
  const isCatBreedSent = catBreeds?.length && catBreeds.length > 0;
  // const catBreedIds = catBreeds?.map((breed) => breed.id).join(", ");

  useEffect(() => {
    const { catId } = router.query;
    setIsCatDetailModalOpen(!!catId);
  }, [router, router.isReady, setIsCatDetailModalOpen]);

  useEffect(() => {
    const { catId } = router.query;
    setCatDetail(undefined);

    async function fetchCatDetailData() {
      try {
        const res = await axios.get(
          `https://api.thecatapi.com/v1/images/${catId}`
        );
        setCatDetail(res.data);
      } catch (err) {
        setCatDetail(ERROR_CAT_DETAIL);
        console.error(err);
      }
    }
    fetchCatDetailData();
  }, [router, router.isReady]);

  const onSubmit: SubmitHandler<{}> = () => {
    const { catId } = router.query;
    axios
      .post(
        `https://api.thecatapi.com/v1/favourites`,
        {
          image_id: catId,
          // change to random hash or a login
          sub_id: "user1",
        },
        {
          headers: {
            "x-api-key": api_key,
          },
        }
      )
      .then(() => {
        setFavoriteUpdateStatus(FavoriteUpdateStatus.success);
      })
      .catch((err) => {
        setFavoriteUpdateStatus(FavoriteUpdateStatus.error);
        console.error(err);
      });
  };

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isCatDetailModalOpen}
      // onAfterClose={() =>
      //   router.push({
      //     query: {
      //       catId: "", // delete the query param
      //     },
      //   })
      // }
    >
      <button
        onClick={() =>
          router.replace({
            query: {
              catId: "", // delete the query param
            },
          })
        }
      >
        Test Exit
      </button>
      {!catDetail ? (
        <p>Loading ...</p>
      ) : catDetail.id === "error" ? (
        <p className="red"> Failed to load cat details.</p>
      ) : (
        <div
          key={catDetail?.id}
          onClick={() =>
            router.push({
              query: {
                catId: catDetail?.id, // update the query param
              },
            })
          }
        >
          <Image
            className="relative "
            src={catDetail?.url || ""}
            alt="Cat detail picture"
            width={350}
            height={350}
          />
          {isCatBreedSent && (
            <div>
              <h3> This cat is a part of breed </h3>

              <ul>
                {catDetail.breeds.map((breed) => (
                  <li key={breed.id}>
                    <strong> {breed.name} </strong>
                    <p>{breed.description}</p>

                    <Link href={`/breeds/${breed}`}>
                      More cats from {breed.name} breed
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* add star filled/empty to describe wheter the cat is favoured already - if the info is in the API */}
          {/* <form className="yellow"> Favourite </form> */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <button>
              <input type="submit" />
            </button>
          </form>
        </div>
      )}
    </ReactModal>
  );
};
