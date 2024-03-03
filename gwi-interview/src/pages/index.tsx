import Home from "@/components/pages/Home";
import { urlParamAsString } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useMemo } from "react";

const HomePage = () => {
  const router = useRouter();
  const catId = useMemo(
    () => urlParamAsString(router.query.catId),
    [router.isReady, router.query.catId]
  );

  // if (!id) {
  //     return <Error404Page />
  // }

  return (
    <Home catId={catId} />
    // <>
    //     <CustomHead title={'blog-detail'} />
    //     <PublicRoute>
    //         <BlogDetail id={id} />
    //     </PublicRoute>
    // </>
  );
};
export default HomePage;
