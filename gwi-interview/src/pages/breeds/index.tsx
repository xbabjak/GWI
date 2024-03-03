import Breeds from "@/components/pages/Breeds";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const urlParamAsString = (input?: string | string[]) => {
  if (Array.isArray(input)) return input[0];
  return input;
};

const BreedsPage = () => {
  const router = useRouter();
  const breedId = useMemo(
    () => urlParamAsString(router.query.id),
    [router.isReady, router.query.id]
  );
  //   const breedId = useMemo(() => router.query.breedId, [router.query.breedId]);

  // if (!id) {
  //     return <Error404Page />
  // }

  return (
    <Breeds breedId={breedId} />
    // <>
    //     <CustomHead title={'blog-detail'} />
    //     <PublicRoute>
    //         <BlogDetail id={id} />
    //     </PublicRoute>
    // </>
  );
};
export default BreedsPage;
