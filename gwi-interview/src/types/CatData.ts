export type CatData = {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: { id: string; name: string; description: string }[];
  // favourite: boolean;
};
