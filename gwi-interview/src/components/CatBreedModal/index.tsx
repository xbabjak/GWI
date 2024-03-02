import ReactModal from "react-modal";
import Image from "next/image";
import Link from "next/link";
import { useCatBreedModal } from "./hooks/useCatBreedModal";

export const CatBreedModal = () => {
  const { catBreed, isCatBreedModalOpen, closeModal } = useCatBreedModal();

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
      {/* to do */}
      <button> Load more</button>
    </ReactModal>
  );
};
