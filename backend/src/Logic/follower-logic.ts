import { ResourceNotFound, ValidationError } from "../Models/ErrorModels";
import { FollowerType, validateFollower } from "../Models/FollowerModel";
import { UserType } from "../Models/UserModel";
import { VacationType } from "../Models/VacationModel";
import { VacationWithNumOfFollowers } from "../Models/VacationWithNumOfFollowers";
import { executeSqlQuery } from "../Utils/dal";
import { OkPacket } from "mysql";


//get all followers for all vacations
export const getAllFollowersRecordssLogic = async (): Promise<FollowerType[]> => {
  const getAllFollowersRecordsQuery = `
SELECT * FROM followers`;

  const AllFollowersRecords = (await executeSqlQuery(getAllFollowersRecordsQuery)) as FollowerType[];

  return AllFollowersRecords;
};

//get one follower record , user that follow vacation ( vacation followed by user)
export const getOneFollowerRecordLogic = async (follower:FollowerType): Promise<FollowerType> => {
  const getOneFollowerRecordQuery = `
  SELECT * FROM followers
  WHERE user_id = "${follower.user_id}" AND vacation_id = "${follower.vacation_id}";
  `;

  const sqlResult = (await executeSqlQuery(getOneFollowerRecordQuery)) as FollowerType[];

  if (sqlResult.length === 0) ResourceNotFound(follower);

  const returnedFollower = sqlResult[0];

  return returnedFollower;
};


//get all vacations a user is following
export const getAllVacationsUserIsFollowingLogic = async (user_id:number): Promise<VacationType[]> => {
  const getAllVacationsUserIsFollowingQuery = `
  SELECT v.*
  FROM vacations v
  JOIN followers f ON v.id = f.vacation_id
  WHERE f.user_id = "${user_id}";`;

  const vacations = (await executeSqlQuery(getAllVacationsUserIsFollowingQuery)) as VacationType[];

  return vacations;
};

//get all users following a particular vacation
export const getAllUsersFollowingParticularVacationLogic = async (vacation_id:number): Promise<UserType[]> => {
  const getAllUsersFollowingParticularVacationQuery = `
  SELECT u.*
  FROM users u
  JOIN followers f ON u.id = f.user_id
  WHERE f.vacation_id = "${vacation_id}";`;

  const users = (await executeSqlQuery(getAllUsersFollowingParticularVacationQuery)) as UserType[];

  return users;
};

//add a record indicating that a user is following a vacation
export const addRecordUserFollowingVacationLogic = async (newFollower:FollowerType): Promise<FollowerType> => {
    validateFollower(newFollower);
  
    // check if follower record is already exists
    const checkFollowerExistQuery = `
    SELECT * FROM followers
    WHERE user_id = "${newFollower.user_id}" AND vacation_id = "${newFollower.vacation_id}";
    `;

    const isFollowerExists = await executeSqlQuery(checkFollowerExistQuery);
    if (isFollowerExists.length !== 0) ValidationError("Follower is already exists.");

    // check if vacation exists and we don't make follow to unexist vacation
    const checkVacationExistQuery = `
    SELECT * FROM vacations
    WHERE id = "${newFollower.vacation_id}"
    `;

    const isVacationExists = await executeSqlQuery(checkVacationExistQuery);
    if (isVacationExists.length === 0) ValidationError("Vacation is not exists.can't follow vacation that doesn't exist");


    // check if user exists and we don't make follow from user that doesn't exist
    const checkUserExistQuery = `
    SELECT * FROM users
    WHERE id = "${newFollower.user_id}"
    `;

    const isUserExists = await executeSqlQuery(checkUserExistQuery);
    if (isUserExists.length === 0) ValidationError("User is not exists.can't follow any vacation");

    // add follower to vacation
    const addRecordUserFollowingVacationQuery = `
    INSERT INTO followers (user_id, vacation_id) 
    VALUES ("${newFollower.user_id}", "${newFollower.vacation_id}");
    `;

    const addFollowerInfo: OkPacket = await executeSqlQuery(addRecordUserFollowingVacationQuery);
  
    if (addFollowerInfo.affectedRows < 1) ValidationError(addFollowerInfo.message);
  
     return newFollower;
  };
  
// remove follower
  export const removeRecordUserFollowingVacationLogic = async (follower:FollowerType): Promise<void> => {
    const checkFollowerExistQuery = `
    SELECT * FROM followers
    WHERE user_id = "${follower.user_id}" AND vacation_id = "${follower.vacation_id}";
    `;
    const isFollowerExists = await executeSqlQuery(checkFollowerExistQuery);
  
    if (isFollowerExists.length === 0) ValidationError("Follower is not exists, Can't be removed");
  
    const deleteFollowerQuery = `
    DELETE FROM followers
    WHERE user_id = "${follower.user_id}" AND vacation_id = "${follower.vacation_id}";
    `;
  
    const info: OkPacket = await executeSqlQuery(deleteFollowerQuery);
  
    if (info.affectedRows <= 0) ResourceNotFound(follower);
  };

  //update followers count for a specific vacation
export const updateFollowersCountLogic = async (vacationId: number, newLikesCount: number): Promise<void> => {
  // check if the vacation exists
  const checkVacationExistQuery = `
    SELECT id FROM vacations
    WHERE id = ${vacationId}`

  const vacationExists = await executeSqlQuery(checkVacationExistQuery)
  if (vacationExists.length === 0) {
    throw ResourceNotFound(vacationId);
  } 
   //update the likes count for the specified vacation 

   const updateLikesQuery = `
   UPDATE vacations
   SET likes = ${newLikesCount}
   WHERE id = ${vacationId}`

 const result: OkPacket = await executeSqlQuery(updateLikesQuery)
 if (result.affectedRows === 0) {
   throw ValidationError(`Failed to update likes for vacation with ID ${vacationId}.`);
 }
};

// get number of followers for particular vacation
export const getNumberOfUsersFollowingParticularVacation = async (vacation_id: number): Promise<number> => {
  const getNumberOfUsersFollowingParticularVacationQuery = `
  SELECT COUNT(*) as numOfFollowers
  FROM followers
  WHERE vacation_id = ${vacation_id};`;

  const result = await executeSqlQuery(getNumberOfUsersFollowingParticularVacationQuery) as { numOfFollowers: number }[];
  return result[0].numOfFollowers;
};


// get array includes number of followers for each vacation
export const getAllVacationsWithNumOfFollowers = async (): Promise<VacationWithNumOfFollowers[]> => {
  const getAllVacationsWithFollowersQuery = `
  SELECT v.*, COUNT(f.user_id) AS numberOfFollowers
  FROM vacations v
  LEFT JOIN followers f ON v.id = f.vacation_id
  GROUP BY v.id
  ORDER BY v.start_date;
  `;

  const vacationsWithFollowersArray = await executeSqlQuery(getAllVacationsWithFollowersQuery) as VacationWithNumOfFollowers[];
  return vacationsWithFollowersArray;

}


//get all vacations a user is following with number of followers for each vacation
export const getFollowedVacationsWithNumOfFollowers = async (user_id:number): Promise<VacationWithNumOfFollowers[]> => {
  const getFollowedVacationsWithFollowersQuery = `
  SELECT v.*, COUNT(f2.user_id) AS numberOfFollowers
  FROM vacations v
  JOIN followers f1 ON v.id = f1.vacation_id AND f1.user_id = "${user_id}"
  LEFT JOIN followers f2 ON v.id = f2.vacation_id
  GROUP BY v.id
  ORDER BY v.start_date;
  `;

  const vacations = (await executeSqlQuery(getFollowedVacationsWithFollowersQuery)) as VacationWithNumOfFollowers[];
  return vacations;
};



