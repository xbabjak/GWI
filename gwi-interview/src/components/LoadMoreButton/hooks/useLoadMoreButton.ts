import { useMemo } from "react";
import { UseLoadMoreButtonProps } from "../utils/types";

export const useLoadMoreButton = ({
  isDisabledLoadMoreButton,
}: UseLoadMoreButtonProps) => {
  const buttonColor = useMemo(() => {
    return isDisabledLoadMoreButton ? "bg-gray-600" : "bg-blue-950";
  }, [isDisabledLoadMoreButton]);

  return { buttonColor };
};
