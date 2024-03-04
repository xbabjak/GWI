import { Navbar } from "@/components/Navbar";
import Breeds from "@/components/pages/Breeds";
import { urlParamAsString } from "@/utils/helpers";
import { useRouter } from "next/router";
import { useMemo } from "react";

const BreedsPage = () => {
  const router = useRouter();
  const breedId = useMemo(
    () => urlParamAsString(router.query.id),
    [router.isReady, router.query.id]
  );

  // if (!id) {
  //     return <Error404Page />
  // }

  return (
    <>
      <Navbar />
      <Breeds breedId={breedId} />
    </>
    // <>
    //     <CustomHead title={'blog-detail'} />
    //     <PublicRoute>
    //         <BlogDetail id={id} />
    //     </PublicRoute>
    // </>
  );
};
export default BreedsPage;
