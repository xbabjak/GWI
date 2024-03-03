import ReactModal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { useCatBreedModal } from "./hooks/useCatBreedModal";
import LoadMoreButton from "../LoadMoreButton";

export const CatBreedModal = ({ breedId }: { breedId?: string }) => {
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
      <button onClick={closeModal}> Close modal </button>

      <div className="flex flex-wrap justify-between">
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
    </ReactModal>
  );
};
