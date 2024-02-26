import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import router, { useRouter } from "next/router";

type catData = {
  id: "string";
  url: "string";
  width: number;
  height: number;
  // breed: []
  // favourite: boolean;
};

const View1Page = () => {
  const [catPosts, setCatPosts] = useState<catData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_Dwpo3nJNqmH8xQWMVomZRCemxu9Qv2P8OClaBwfjB89nOfhHczGEGyFoCTlTbVWK"
        );
        setCatPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  //   router.push({
  //     pathname: '/signup',
  //     query: {
  //        pageId: "page-1"  // update the query param
  //     }
  //  }, undefined, { shallow: true})

  return (
    <div>
      {catPosts.map((catPost) => (
        //useMemo
        <div
          onClick={() =>
            router.push({
              query: {
                catId: catPost.id, // update the query param
              },
            })
          }
        >
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src={catPost.url}
            alt="Next.js Logo"
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
};

export default View1Page;
