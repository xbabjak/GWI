import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CatDetailModal } from "@/components/CatDetailModal";
import { useHome } from "./hooks/useHome";
import LoadMoreButton from "@/components/LoadMoreButton";

const Home = ({ catId }: { catId?: string }) => {
  const { catPosts, isDisabledLoadMoreButton, isLoading, onMorePagesClick } =
    useHome();

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
        {/*  add 10 skeleton images when loading */}
      </div>
      <CatDetailModal catId={catId} />
      <LoadMoreButton
        isLoading={isLoading}
        onMorePagesClick={onMorePagesClick}
        isDisabledLoadMoreButton={isDisabledLoadMoreButton}
      />
    </div>
  );
};

export default Home;
