import ReactModal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { FavouriteUpdateStatus } from "./utils/enums";
import { useCatBreedModal } from "./hooks/useCatDetailModal";
import { Star } from "../Star";

export const CatDetailModal = ({ catId }: { catId?: string }) => {
  const {
    isCatDetailModalOpen,
    catDetail,
    isCatBreedSent,
    isFavourited,
    favouriteUpdateStatus,
    onSubmit,
    closeModal,
  } = useCatBreedModal({ catId });

  return (
    <ReactModal ariaHideApp={false} isOpen={isCatDetailModalOpen}>
      <div className="flex flex-col">
        <button onClick={closeModal}>Test Exit</button>
        {!catDetail ? (
          <p>Loading ...</p>
        ) : catDetail.id === "error" ? (
          <p className="red"> Failed to load cat details.</p>
        ) : (
          <div className="mx-auto">
            <div className="flex justify-center">
              <Image
                src={catDetail.url}
                alt={catDetail.url}
                width={catDetail.width}
                height={catDetail.height}
              />
            </div>
            {isCatBreedSent && (
              <div>
                <h3> This cat is a part of breed </h3>

                <ul>
                  {catDetail.breeds.map((breed) => (
                    <li key={breed.id}>
                      <strong> {breed.name} </strong>
                      <p>{breed.description}</p>

                      <Link
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        href={`/breeds?id=${breed.id}`}
                      >
                        More cats from {breed.name} breed
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={onSubmit} className="flex">
              <button className="flex">
                <Star isYellow={isFavourited} />
                <input
                  type="submit"
                  placeholder="Favourite"
                  className="mr-2"
                  // add gray collor as feedback that the button is disabled
                  disabled={isFavourited}
                />
              </button>
              {/* fill in reason for api fail */}
              {favouriteUpdateStatus === FavouriteUpdateStatus.error && (
                <p className="text-red-700">
                  Failed to favourite because of {}
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </ReactModal>
  );
};
