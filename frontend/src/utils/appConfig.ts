import { AppConfig } from "../Models/AppConfig";


export const appConfig: AppConfig = {
    baseUrl: "http://localhost:3001/api",
    imagesFolder: "http://localhost:3001/Assets/",

    get: {
        oneVacation: "/vacations/",
        allVacations:"/vacations",
        upcomingVacations: "/upcomingvacations",
        activeVacations: "/activevacations",
        allFollowersForAllVacations: "/followers",
        oneUserFollowOneVacation: "/followers/",
        allVacationsFollowedByUser: "/followed/",
        allUsersFollowingParticularVacation: "/followers/",
        numberOfUsersFollowingParticularVacation: "/followersnumber/",
        allVacationsWithNumOfFollowers: "/followersnumber",
        followedVacationsByUserWithfollowers: "/followedwithfollowers/"
      },
  
      post: {
        vacation: "/vacations",
        follower: "/followers",
      },
  
      update: {
        vacation: "/vacations/",
      },

      delete: {
        vacation: "/vacations/",
        follower: "/unfollow/",
      },

      auth: {
        login: 'http://localhost:3001/api/auth/login',
        signup: 'http://localhost:3001/api/auth/signup',
        userInformation: 'http://localhost:3001/api/auth/user'
      },

}