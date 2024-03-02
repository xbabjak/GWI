import React from "react";
import Image from "next/image";
import Link from "next/link";

import "../styles/globals.css";
import { CatDetailModal } from "@/components/CatDetailModal";
import { useHome } from "./hooks/useHome";

const HomePage = () => {
  const { catPosts, loadMoreCats } = useHome();

  return (
    <div>
      {/* add a navbar for all 3 pages - home, breeds, favourites */}
      <div className="flex flex-wrap justify-between ">
        {catPosts.map((catPost) => (
          <Link
            key={catPost.id}
            href={`?catId=${catPost.id}`}
            className="col col-lg"
          >
            <Image
              src={catPost.url}
              alt={catPost.url}
              width={catPost.width}
              height={catPost.height}
            />
          </Link>
        ))}
      </div>
      <CatDetailModal />
      <button className="h-20 bg-blue-950" onClick={loadMoreCats}>
        Load more cats
      </button>
    </div>
  );
};

export default HomePage;
