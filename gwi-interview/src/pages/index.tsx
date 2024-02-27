import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import router, { useRouter } from "next/router";
import ReactModal from "react-modal";

import "../styles/globals.css";

const api_key =
  "live_Dwpo3nJNqmH8xQWMVomZRCemxu9Qv2P8OClaBwfjB89nOfhHczGEGyFoCTlTbVWK";

type catData = {
  id: string;
  url: string;
  width: number;
  height: number;
  // breed: []
  // favourite: boolean;
};

// const router = useRouter()
// const id = useMemo(() => urlParamAsString(router.query.id), [router.query.id])

// export const urlParamAsString = (input?: string | string[]) => {
//   if (Array.isArray(input)) return input[0]
//   return input
// }

const View1Page = () => {
  const [catPosts, setCatPosts] = useState<catData[]>([]);
  const [catDetail, setCatDetail] = useState<catData>();
  const [isCatDetailModalOpen, setIsCatDetailModalOpen] =
    useState<boolean>(false);

  const uRouter = useRouter();

  useEffect(() => {
    async function fetchCatsData() {
      try {
        const res = await axios.get(
          `https://api.thecatapi.com/v1/images/search?limit=10&api_key=${api_key}`
        );
        setCatPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCatsData();
  }, []);

  useEffect(() => {
    const { catId } = uRouter.query;
    setCatDetail(undefined);

    async function fetchCatDetailData() {
      try {
        const res = await axios.get(
          `https://api.thecatapi.com/v1/images/${catId}`
        );
        setCatDetail(res.data);
      } catch (err) {
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
  }, [uRouter, uRouter.isReady]);

  useEffect(() => {
    const { catId } = uRouter.query;
    console.log("help");
    console.log(!!router.query.catId);
    console.log(catId);
    console.log(uRouter);
    setIsCatDetailModalOpen(!!catId);
  }, [router, uRouter, uRouter.isReady, setIsCatDetailModalOpen]);

  return (
    <div>
      {catPosts.map((catPost) => (
        <Link href={`?catId=${catPost.id}`}>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src={catPost.url}
            alt={catPost.url}
            width={350}
            height={350}
          />
        </Link>
      ))}
      <ReactModal
        isOpen={isCatDetailModalOpen}
        onAfterClose={() =>
          router.push({
            query: {
              catId: "", // update the query param
            },
          })
        }
      >
        <button
          onClick={() =>
            router.replace({
              query: {
                catId: "", // update the query param
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
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src={catDetail?.url || ""}
              alt="Cat detail picture"
              width={350}
              height={350}
            />
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default View1Page;
