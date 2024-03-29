import ReactModal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { useCatBreedModal } from "./hooks/useCatDetailModal";
import { Star } from "../Star";
import { Spinner } from "../Spinner";
import { CatDetailModalPropsType } from "./utils/types";

export const CatDetailModal = ({ catId }: CatDetailModalPropsType) => {
  const {
    isLoading,
    isCatDetailModalOpen,
    catDetail,
    isCatBreedSent,
    favoritedId,
    onSubmit,
    closeModal,
  } = useCatBreedModal({ catId });

  return (
    <ReactModal ariaHideApp={false} isOpen={isCatDetailModalOpen}>
      <h1 className=" text-3xl text-center"> Cat detail </h1>

      <div className="flex flex-col">
        <button onClick={closeModal}>Test Exit</button>
        {!catDetail ? (
          <Spinner />
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
            {isCatBreedSent ? (
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
            ) : (
              <p> No breed details found </p>
            )}

            {isLoading ? (
              <Spinner />
            ) : (
              <form onSubmit={onSubmit} className="flex">
                <button className="flex">
                  <Star isYellow={!!favoritedId} />
                  <input
                    type="submit"
                    placeholder="Favourite"
                    className="mr-2"
                    // add gray collor as feedback that the button is disabled
                    disabled={!!favoritedId}
                  />
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </ReactModal>
  );
};
