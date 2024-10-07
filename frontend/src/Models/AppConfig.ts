export type AppConfig = {

  baseUrl: string;
  imagesFolder: string;

  get: {
    oneVacation: string;
    allVacations: string;
    allFollowersForAllVacations: string;
    oneUserFollowOneVacation: string;
    upcomingVacations: string;
    activeVacations: string;
    allVacationsFollowedByUser: string;
    allUsersFollowingParticularVacation: string;
    numberOfUsersFollowingParticularVacation: string;
    allVacationsWithNumOfFollowers: string;
    followedVacationsByUserWithfollowers: string;
  };

  post: {
    vacation: string;
    follower: string;
  };

  update: {
    vacation: string;
  };
  delete: {
    vacation: string;
    follower: string;
  };

  auth: {
    login: string;
    signup: string;
    userInformation: string;
  }

};
