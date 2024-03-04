import { CustomHead } from "@/components/CustomHead";
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

  return (
    <>
      <CustomHead title="Cat breeds" />
      <Navbar />
      <Breeds breedId={breedId} />
    </>
  );
};
export default BreedsPage;
