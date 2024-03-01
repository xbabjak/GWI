import ReactModal from "react-modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CatData } from "@/types/CatData";
import Link from "next/link";
import { ERROR_CAT_BREED } from "./constants";
import { api_key } from "@/keys";

export const CatBreedModal = () => {
  const router = useRouter();

  const [catBreed, setCatBreed] = useState<CatData[]>();
  const [isCatBreedModalOpen, setIsCatBreedModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const { id } = router.query;
    setIsCatBreedModalOpen(!!id);
  }, [router, router.isReady, setIsCatBreedModalOpen]);

  useEffect(() => {
    // move breed id retrieving to page component
    const { id } = router.query;
    setCatBreed(undefined);

    async function fetchCatBreedData() {
      try {
        const res = await axios.get(
          `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`,
          {
            headers: {
              "x-api-key": api_key,
            },
          }
        );
        setCatBreed(res.data);
      } catch (err) {
        setCatBreed([ERROR_CAT_BREED]);
        console.error(err);
      }
    }
    fetchCatBreedData();
  }, [router, router.isReady]);

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={isCatBreedModalOpen}
      // onAfterClose={() =>
      //   router.push({
      //     query: {
      //       catId: "", // delete the query param
      //     },
      //   })
      // }
    >
      <button
        onClick={() => {
          router.replace({
            query: {
              id: "", // delete the query param
            },
          });
        }}
      >
        Test Exit
      </button>
      {catBreed?.map((breed) => (
        <Link key={breed.id} href={`/?catId=${breed.id}`}>
          <Image
            className="relative "
            src={breed.url}
            alt="Cat breed picture"
            width={350}
            height={350}
          />
        </Link>
      ))}
    </ReactModal>
  );
};
