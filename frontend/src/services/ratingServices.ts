import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { RatingType } from "../Models/RatingModel";

export const getRatingsByVacationId = async (vacationId: number): Promise<RatingType[]> => {
    const response = await axios.get<RatingType[]>(`${appConfig.baseUrl}/vacations/${vacationId}/rating`);
    return response.data;
};

export const addRating = async (vacationId: number, userId: number, rating: number): Promise<RatingType> => {
    try {
        const response = await axios.post<RatingType>(
            `${appConfig.baseUrl}/vacations/${vacationId}/rating`,
            { userId, rating }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding rating:", error);
        throw error;
    }
};



export const updateRating = async (rating: RatingType): Promise<RatingType> => {
    try {
        const response = await axios.put<RatingType>(
            `${appConfig.baseUrl}/rating/${rating.id}`,
            rating
        );
        return response.data;
    } catch (error) {
        console.error("Error updating rating:", error);
        throw error;
    }
};


export const deleteRating = async (ratingId: number): Promise<void> => {
    try {
        await axios.delete<void>(`${appConfig.baseUrl}/rating/${ratingId}`);
    } catch (error) {
        console.error("Error deleting rating:", error);
        throw error;
    }
};
