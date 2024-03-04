import { CustomHead } from "@/components/CustomHead";
import { Error404 } from "@/components/pages/Error404";

const Error404Page = () => {
  return (
    <>
      <CustomHead title="404 Error" />
      <Error404 />
    </>
  );
};
export default Error404Page;
