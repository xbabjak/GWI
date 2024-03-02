import ReactModal from "react-modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CatData } from "@/types/CatData";
import Link from "next/link";
import { ERROR_CAT_BREED } from "./constants";
import { api_key } from "@/keys";
import { CAT_API_BASE_URL } from "@/constants";

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
          `${CAT_API_BASE_URL}/images/search?breed_ids=${id}&limit=10`,
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
    <ReactModal ariaHideApp={false} isOpen={isCatBreedModalOpen}>
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
      <div className="flex flex-wrap justify-between">
        {catBreed?.map((breed) => (
          <Link
            key={breed.id}
            href={`/?catId=${breed.id}`}
            className="col col-lg"
          >
            <Image src={breed.url} alt={breed.url} width={350} height={350} />
          </Link>
        ))}
      </div>
      {/* to do */}
      <button> Load more</button>
    </ReactModal>
  );
};
