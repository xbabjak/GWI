import { useLoadMoreButton } from "./hooks/useLoadMoreButton";
import { LoadMoreButtonProps } from "./utils/types";

const LoadMoreButton = ({
  onMorePagesClick,
  isDisabledLoadMoreButton,
  isLoading,
}: LoadMoreButtonProps) => {
  const { buttonColor } = useLoadMoreButton({ isDisabledLoadMoreButton });

  return (
    <>
      <button
        className={`h-12 w-28 ${buttonColor} flex justify-center items-center text-white rounded`}
        onClick={onMorePagesClick}
        disabled={isDisabledLoadMoreButton}
      >
        {isLoading ? (
          <span className="w-5 block animate-spin rounded-full border-4 border-solid loading-spinner" />
        ) : (
          <p> Load more </p>
        )}
      </button>
    </>
  );
};

export default LoadMoreButton;
