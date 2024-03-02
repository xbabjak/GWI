import ReactModal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { FavouriteUpdateStatus } from "./utils/enums";
import { useCatBreedModal } from "./hooks/useCatDetailModal";

export const CatDetailModal = () => {
  const {
    isCatDetailModalOpen,
    setFavouriteUpdateStatus,
    router,
    catDetail,
    isCatBreedSent,
    isFavourited,
    favouriteUpdateStatus,
    onSubmit,
  } = useCatBreedModal();

  return (
    <ReactModal ariaHideApp={false} isOpen={isCatDetailModalOpen}>
      <div className="flex flex-col">
        <button
          onClick={() => {
            setFavouriteUpdateStatus(FavouriteUpdateStatus.uncalled);
            router.replace({
              query: {
                catId: "", // delete the query param
              },
            });
          }}
        >
          Test Exit
        </button>
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
                {/* make YellowStar component */}
                <svg
                  className={
                    isFavourited
                      ? "w-5 h-5 text-yellow-300 me-1"
                      : "w-5 h-5 text-gray-300 me-1 dark:text-gray-500"
                  }
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
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
