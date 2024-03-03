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
    <div>
      <div className="flex flex-wrap justify-between">
        {favouriteCats.map((cat) => (
          <>
            <div key={cat.image.id} className="col col-lg">
              <Image
                src={cat.image.url}
                alt={cat.image.url}
                height={cat.image.height || 350}
                width={cat.image.width || 350}
              />
            </div>
            {/* toto by mal byt form */}
            {/* sprav to, ze ak hovernes na obrazok, tak sa ukaze "X" */}
            <button
              key={cat.image.id}
              className="pr-10"
              // className="mx-auto w-full"
              onClick={() => unfavouriteCatImage(cat.id)}
            >
              <p className="text-red-700 "> X </p>
            </button>
          </>
        ))}
      </div>

      <LoadMoreButton
        // add CSS to show button is disabled
        // move logic to hook
        onMorePagesClick={onMorePagesClick}
        isDisabledLoadMoreButton={isDisabledLoadMoreButton}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Favourites;
