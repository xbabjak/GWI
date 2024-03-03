import Favourites from "@/components/pages/Favourites";
import { useRouter } from "next/router";
import { useMemo } from "react";

const FavouritesPage = () => {
  const router = useRouter();
  // const id = useMemo(() => urlParamAsString(router.query.id), [router.query.id])
  const id = useMemo(() => router.query.id, [router.query.id]);

  // if (!id) {
  //     return <Error404Page />
  // }

  return (
    <Favourites />
    // <>
    //     <CustomHead title={'blog-detail'} />
    //     <PublicRoute>
    //         <BlogDetail id={id} />
    //     </PublicRoute>
    // </>
  );
};
export default FavouritesPage;
