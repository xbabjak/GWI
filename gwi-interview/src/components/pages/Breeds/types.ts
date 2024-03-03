export type Breed = {
  id: string;
  name: string;
  image: {
    url: string;
  };
  temperament: string;
  wikipedia_url: string;
};

export type BreedsPropsType = {
  breedId?: string;
};
