import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

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

  const loadMoreCats = useCallback(() => {
    async function fetchFullCatsData() {
      try {
        const res = await axios.get(
          `https://api.thecatapi.com/v1/images/search?limit=10&api_key=${api_key}`
        );
        //.filter((v, i, a) => a.findIndex(t => (t.card_id === v.id)) === i);
        // maybe remove duplicities
        setCatPosts((posts) => [...posts, ...res.data]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchFullCatsData();
  }, [setCatPosts]);

  return (
    <div>
      {catPosts.map((catPost) => (
        <Link href={`?catId=${catPost.id}`}>
          <Image src={catPost.url} alt={catPost.url} width={350} height={350} />
        </Link>
      ))}
      <CatDetailModal />
      <button className="h-20 bg-blue-950" onClick={loadMoreCats}>
        Load more cats
      </button>
    </div>
  );
};

export default View1Page;
