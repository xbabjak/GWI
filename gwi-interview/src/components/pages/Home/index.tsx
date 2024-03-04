import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CatDetailModal } from "@/components/CatDetailModal";
import { useHome } from "./hooks/useHome";
import LoadMoreButton from "@/components/LoadMoreButton";
import { HomePropsType } from "./utils/types";

const Home = ({ catId }: HomePropsType) => {
  const { catPosts, isDisabledLoadMoreButton, isLoading, onMorePagesClick } =
    useHome();

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl"> Random cat images </h1>
      <div className="flex flex-wrap justify-between w-full">
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
