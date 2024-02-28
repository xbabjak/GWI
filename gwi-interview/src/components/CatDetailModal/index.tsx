import ReactModal from "react-modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CatData } from "@/types/CatData";
import Link from "next/link";
import { ERROR_CAT_DETAIL } from "./constants";

export const CatDetailModal = () => {
  const router = useRouter();

  const [catDetail, setCatDetail] = useState<CatData>();
  const [isCatDetailModalOpen, setIsCatDetailModalOpen] =
    useState<boolean>(false);

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

  return (
    <ReactModal
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
          <form className="yellow"> Favourite </form>
        </div>
      )}
    </ReactModal>
  );
};
