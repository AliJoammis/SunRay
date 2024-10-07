import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { FollowerType } from "../Models/FollowerModel";
import { VacationType } from "../Models/VacationModel";
import { UserType } from "../Models/UserModel";
import { VacationWithNumOfFollowers } from "../Models/VacationWithNumOfFollowers";


export const getAllFollowers = async (): Promise<FollowerType[]> => {
    const fullUrl = appConfig.baseUrl + appConfig.get.allFollowersForAllVacations;

    const data = await axios
    .get(fullUrl)
    .then((res) => res.data as FollowerType[])
    .catch(e => console.log(e))

    return data ? data as FollowerType[]: [];

}

export const getOneUserFollowOneVacation = async (follower:FollowerType): Promise<FollowerType> => {
    const fullUrl = appConfig.baseUrl + appConfig.get.oneUserFollowOneVacation + 
    follower.user_id + "/" + follower.vacation_id ;

    const data = await axios
    .get(fullUrl)
    .then((res) => res.data)
    .catch(e => console.log(e))

    return data as FollowerType;

}

export const getAllVacationsFollowedByUser = async (id: string): Promise<VacationType[]> => {
    const fullUrl = appConfig.baseUrl + appConfig.get.allVacationsFollowedByUser + id;

    const data = await axios
    .get(fullUrl)
    .then((res) => res.data as VacationType[])
    .catch(e => console.log(e))

    return data ? data as VacationType[]: [];

}

export const getAllUsersFollowingParticularVacation = async (id: string): Promise<UserType[]> => {
    const fullUrl = appConfig.baseUrl + appConfig.get.allUsersFollowingParticularVacation + id;

    const data = await axios
    .get(fullUrl)
    .then((res) => res.data as UserType[])
    .catch(e => console.log(e))

    return data ? data as UserType[]: [];

}



export const addFollower = async (follower: FollowerType): Promise<FollowerType> => {
    const fullUrl = appConfig.baseUrl + appConfig.post.follower;

    const formData = new FormData();
    formData.append("user_id",JSON.stringify(follower.user_id));
    formData.append("vacation_id",JSON.stringify(follower.vacation_id));

    const data = await axios
    .post(fullUrl,follower)
    .then((res) => res.data)
    .catch(e => console.log(e))

    return data as FollowerType;

}


export const deleteFollower = async (follower: FollowerType): Promise<void> => {
    const fullUrl = appConfig.baseUrl + appConfig.delete.follower + 
    follower.user_id + "/" + follower.vacation_id;

    const data = await axios
    .delete(fullUrl)
    .then((res) => console.log("Unfollowed vacation by user, status: " + res.status))
    .catch(e => console.log(e))
    console.log(data)
}
export const updateFollowersCount = async (id:number, newFollowers:number) => {
    const url = `/api/updateFollowers/${id}`;
    const response = await axios.post(url, { likes: newFollowers });
    return response.data;
  };

export const getNumberOfUsersFollowingParticularVacation = async (id: string): Promise<number> => {
    const fullUrl = appConfig.baseUrl + appConfig.get.numberOfUsersFollowingParticularVacation + id;

    const data = await axios
    .get(fullUrl)
    .then((res) => res.data as number)
    .catch(e => console.log(e))

    return data as number;

}

export const getAllVacationsWithNumOfFollowers = async (): Promise<VacationWithNumOfFollowers[]> => {
    const fullUrl = appConfig.baseUrl + appConfig.get.allVacationsWithNumOfFollowers;

    const data = await axios
    .get(fullUrl)
    .then((res) => res.data as VacationWithNumOfFollowers[])
    .catch(e => console.log(e))

    return data as VacationWithNumOfFollowers[];

}

export const getFollowedVacationsByUser = async (user_id: number): Promise<VacationWithNumOfFollowers[]> => {
    const fullUrl = appConfig.baseUrl + appConfig.get.allVacationsFollowedByUser + user_id;

    const data = await axios
    .get(fullUrl)
    .then((res) => res.data as VacationWithNumOfFollowers[])
    .catch(e => console.log(e))

    return data ? data as VacationWithNumOfFollowers[]: [];

}