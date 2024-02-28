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

  const catBreed = catDetail?.breeds;
  const isCatBreedSent = catBreed?.length && catBreed.length > 0;
  const catBreedId = isCatBreedSent ? catBreed[0].id : "";

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
          {/* Image duplicity - possible solution - make Image being sent as children */}
          {isCatBreedSent ? (
            <Link href={`/breeds/${catBreedId}`}>
              <Image
                className="relative "
                src={catDetail?.url || ""}
                alt="Cat detail picture"
                width={350}
                height={350}
              />
            </Link>
          ) : (
            <Image
              className="relative "
              src={catDetail?.url || ""}
              alt="Cat detail picture"
              width={350}
              height={350}
            />
          )}
        </div>
      )}
    </ReactModal>
  );
};
