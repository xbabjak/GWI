import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import router, { useRouter } from "next/router";

import "../styles/globals.css";
import { CatData } from "@/types/CatData";
import { CatDetailModal } from "@/components/CatDetailModal";

const api_key =
  "live_Dwpo3nJNqmH8xQWMVomZRCemxu9Qv2P8OClaBwfjB89nOfhHczGEGyFoCTlTbVWK";

// const router = useRouter()
// const id = useMemo(() => urlParamAsString(router.query.id), [router.query.id])

// export const urlParamAsString = (input?: string | string[]) => {
//   if (Array.isArray(input)) return input[0]
//   return input
// }

const View1Page = () => {
  const [catPosts, setCatPosts] = useState<CatData[]>([]);

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

  return (
    <div>
      {catPosts.map((catPost) => (
        <Link href={`?catId=${catPost.id}`}>
          <Image
            className="relative "
            src={catPost.url}
            alt={catPost.url}
            width={350}
            height={350}
          />
        </Link>
      ))}
      <CatDetailModal />
      <button
        onClick={() =>
          router.replace({
            query: {
              catId: "", // delete the query param
            },
          })
        }
      >
        Load more cats
      </button>
    </div>
  );
};

export default View1Page;
