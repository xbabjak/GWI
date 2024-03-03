import { CAT_API_BASE_URL } from "@/constants";
import { api_key } from "@/keys";
import { CatData } from "@/types/CatData";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_LIMIT } from "../utils/constants";

// const router = useRouter()
// const id = useMemo(() => urlParamAsString(router.query.id), [router.query.id])

// export const urlParamAsString = (input?: string | string[]) => {
//   if (Array.isArray(input)) return input[0]
//   return input
// }

export const useHome = () => {
  const [catPosts, setCatPosts] = useState<CatData[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isDisabledLoadMoreButton, setIsDisabledLoadMoreButton] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const onMorePagesClick = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  useEffect(() => {
    setIsLoading(true);

    async function fetchCatsData() {
      await axios
        .get(
          `${CAT_API_BASE_URL}/images/search?limit=${API_LIMIT}&page=${pageNumber}`,
          {
            headers: {
              "content-type": "application/json",
              "x-api-key": api_key,
            },
          }
        )
        .then((res) => {
          if (res.data.length < API_LIMIT) {
            setIsDisabledLoadMoreButton(true);
          }
          setCatPosts((cats) => [...cats, ...res.data]);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    fetchCatsData();
  }, [pageNumber, setIsDisabledLoadMoreButton, setCatPosts, setIsLoading]);

  return { catPosts, isDisabledLoadMoreButton, isLoading, onMorePagesClick };
};
