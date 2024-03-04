import Image from "next/image";
import { useFavourites } from "./hooks/useFavourites";
import LoadMoreButton from "@/components/LoadMoreButton";

const Favourites = () => {
  const {
    favouriteCats,
    isDisabledLoadMoreButton,
    unfavouriteCatImage,
    onMorePagesClick,
    isLoading,
  } = useFavourites();

  return (
    <div className="flex flex-col items-center">
      <h1 className=" text-3xl"> Favourite cat images </h1>
      <p className=" text-sm ">
        By clicking on a cat image you remove it from favourites
      </p>
      <div className="flex flex-wrap justify-between w-full">
        {favouriteCats.map((cat) => (
          <div key={cat.image.id} className="col col-lg">
            <Image
              className="transition-all duration-300 rounded-lg hover:blur-sm hover:grayscale"
              src={cat.image.url}
              alt={cat.image.url}
              height={cat.image.height || 350}
              width={cat.image.width || 350}
              onClick={() => unfavouriteCatImage(cat.id)}
            />
          </div>
        ))}
      </div>

      <LoadMoreButton
        onMorePagesClick={onMorePagesClick}
        isDisabledLoadMoreButton={isDisabledLoadMoreButton}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Favourites;
