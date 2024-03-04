import Head from "next/head";
import { CustomHeadPropsType } from "./utils/types";

export const CustomHead = ({ title }: CustomHeadPropsType) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="This is a cat page." />
      </Head>
    </div>
  );
};
