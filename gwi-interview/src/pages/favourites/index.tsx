import { CustomHead } from "@/components/CustomHead";
import { Navbar } from "@/components/Navbar";
import Favourites from "@/components/pages/Favourites";

const FavouritesPage = () => {
  return (
    <>
      <CustomHead title="Favourite cats" />
      <Navbar />
      <Favourites />
    </>
  );
};
export default FavouritesPage;
