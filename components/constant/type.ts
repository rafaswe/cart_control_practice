export type TopRatingsInfoProps = {
  ratings: {
    outOf: number;
    total: number;
  };
  description: string;
  userInfo: {
    image: string;
    name: string;
    proffession: string;
  };
};
