import { Spinner } from "../Spinner";
import { useLoadMoreButton } from "./hooks/useLoadMoreButton";
import { LoadMoreButtonProps } from "./utils/types";

const LoadMoreButton = ({
  onMorePagesClick,
  isDisabledLoadMoreButton,
  isLoading,
}: LoadMoreButtonProps) => {
  const { buttonColor } = useLoadMoreButton({ isDisabledLoadMoreButton });

  return (
    <button
      className={`h-20 w-32 ${buttonColor} flex justify-center items-center text-white rounded sticky bottom-5`}
      onClick={onMorePagesClick}
      disabled={isDisabledLoadMoreButton || isLoading}
    >
      {isLoading ? (
        <Spinner />
      ) : !isDisabledLoadMoreButton ? (
        <p> Load more </p>
      ) : (
        <p className="text-white"> No more data to load </p>
      )}
    </button>
  );
};

export default LoadMoreButton;
