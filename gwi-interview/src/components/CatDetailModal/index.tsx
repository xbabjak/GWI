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

enum FavouriteUpdateStatus {
  uncalled,
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
  const [favouriteUpdateStatus, setFavouriteUpdateStatus] =
    useState<FavouriteUpdateStatus>(FavouriteUpdateStatus.uncalled);

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
      .then((success) => {
        setFavouriteUpdateStatus(FavouriteUpdateStatus.success);
        // remove success
        console.log("success", success);
      })
      .catch((err) => {
        setFavouriteUpdateStatus(FavouriteUpdateStatus.error);
        console.error(err);
      });
  };

  return (
    <ReactModal ariaHideApp={false} isOpen={isCatDetailModalOpen}>
      <div className="flex flex-col">
        <button
          onClick={() => {
            setFavouriteUpdateStatus(FavouriteUpdateStatus.uncalled);
            router.replace({
              query: {
                catId: "", // delete the query param
              },
            });
          }}
        >
          Test Exit
        </button>
        {!catDetail ? (
          <p>Loading ...</p>
        ) : catDetail.id === "error" ? (
          <p className="red"> Failed to load cat details.</p>
        ) : (
          <div className="mx-auto">
            <div className="flex justify-center">
              <Image
                src={catDetail.url}
                alt={catDetail.url}
                width={catDetail.width}
                height={catDetail.height}
              />
            </div>
            {isCatBreedSent && (
              <div>
                <h3> This cat is a part of breed </h3>

                <ul>
                  {catDetail.breeds.map((breed) => (
                    <li key={breed.id}>
                      <strong> {breed.name} </strong>
                      <p>{breed.description}</p>

                      <Link
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        href={`/breeds?id=${breed.id}`}
                      >
                        More cats from {breed.name} breed
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* use favourite api to determine if cat is already marked as favourite  */}
            {/* add star filled/empty to describe wheter the cat is favoured already - if the info is in the API */}
            {favouriteUpdateStatus === FavouriteUpdateStatus.success ? (
              <svg
                className="w-5 h-5 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ) : (
              //  star duplicate (only classname was changed)
              <svg
                className="w-5 h-5 text-gray-300 me-1 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <button>
                <input
                  type="submit"
                  placeholder="Favourite"
                  // disabled={favouriteUpdateStatus === FavouriteUpdateStatus.success}
                />
              </button>
              {/* fill in reason for api fail */}
              {favouriteUpdateStatus === FavouriteUpdateStatus.error && (
                <p className="text-red-700">
                  Failed to favourite because of {}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </ReactModal>
  );
};
