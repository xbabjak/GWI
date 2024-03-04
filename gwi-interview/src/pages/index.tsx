import { CustomHead } from "@/components/CustomHead";
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

  return (
    <>
      <CustomHead title="Random cats" />
      <Home catId={catId} />
    </>
  );
};
export default HomePage;
