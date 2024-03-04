import ReactModal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { useCatBreedModal } from "./hooks/useCatBreedModal";
import LoadMoreButton from "../LoadMoreButton";
import { CatBreedModalPropsType } from "./utils/types";

export const CatBreedModal = ({ breedId }: CatBreedModalPropsType) => {
  const {
    catBreed,
    isCatBreedModalOpen,
    isDisabledLoadMoreButton,
    onMorePagesClick,
    closeModal,
    isLoading,
  } = useCatBreedModal({ breedId });

  return (
    <ReactModal ariaHideApp={false} isOpen={isCatBreedModalOpen}>
      <div className="flex flex-col items-center">
        <button onClick={closeModal}> Close modal </button>
        <h1 className="text-3xl"> Images of simillar breed </h1>

        <div className="flex flex-wrap justify-between w-full">
          {catBreed?.map((breed) => (
            <Link
              key={breed.id}
              href={`/?catId=${breed.id}`}
              className="col col-lg"
            >
              <Image
                src={breed.url}
                alt={breed.url}
                width={breed.width}
                height={breed.height}
              />
            </Link>
          ))}
        </div>

        <LoadMoreButton
          isLoading={isLoading}
          onMorePagesClick={onMorePagesClick}
          isDisabledLoadMoreButton={isDisabledLoadMoreButton}
        />
      </div>
    </ReactModal>
  );
};
