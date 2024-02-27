import ReactModal from "react-modal";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { CatData } from "@/types/CatData";

export const CatDetailModal = () => {
  const router = useRouter();

  const [catDetail, setCatDetail] = useState<CatData>();
  const [isCatDetailModalOpen, setIsCatDetailModalOpen] =
    useState<boolean>(false);

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
        // to communicate to component if the fetch has failed
        setCatDetail({
          id: "error",
          url: "",
          width: 0,
          height: 0,
        });
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
        </div>
      )}
    </ReactModal>
  );
};
