import { CustomHead } from "@/components/CustomHead";
import Favourites from "@/components/pages/Favourites";

const FavouritesPage = () => {
  return (
    <>
      <CustomHead title="Favourite cats" />
      <Favourites />
    </>
  );
};
export default FavouritesPage;
