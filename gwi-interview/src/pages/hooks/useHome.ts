import { CAT_API_BASE_URL } from "@/constants";
import { api_key } from "@/keys";
import { CatData } from "@/types/CatData";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

// const router = useRouter()
// const id = useMemo(() => urlParamAsString(router.query.id), [router.query.id])

// export const urlParamAsString = (input?: string | string[]) => {
//   if (Array.isArray(input)) return input[0]
//   return input
// }

export const useHome = () => {
  const [catPosts, setCatPosts] = useState<CatData[]>([]);

  useEffect(() => {
    async function fetchCatsData() {
      await axios
        .get(`${CAT_API_BASE_URL}/images/search?limit=10`, {
          headers: {
            "content-type": "application/json",
            "x-api-key": api_key,
          },
        })
        .then((res) => {
          setCatPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchCatsData();
  }, []);

  const loadMoreCats = useCallback(() => {
    // use page =0-n attribute instead
    async function fetchFullCatsData() {
      await axios
        .get(`${CAT_API_BASE_URL}/images/search?limit=10`, {
          headers: {
            "content-type": "application/json",
            "x-api-key": api_key,
          },
        })
        .then((res) => {
          // remove duplicities by using pagination
          setCatPosts((posts) => [...posts, ...res.data]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    fetchFullCatsData();
  }, [setCatPosts]);

  return { catPosts, loadMoreCats };
};
