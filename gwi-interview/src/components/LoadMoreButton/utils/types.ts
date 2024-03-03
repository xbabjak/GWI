export type LoadMoreButtonProps = {
  onMorePagesClick: () => void;
  isDisabledLoadMoreButton: boolean;
  isLoading: boolean;
};

export type UseLoadMoreButtonProps = {
  isDisabledLoadMoreButton: boolean;
};
