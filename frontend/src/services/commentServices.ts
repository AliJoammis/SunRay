import axios from "axios";
import { appConfig } from "../utils/appConfig";

export interface CommentType {
    id: number; 
    vacationId: number;
    userId: number;
    text: string;
    created_at?: string; 
}

export const getCommentsByVacationId = async (vacationId: number): Promise<CommentType[]> => {
    const response = await axios.get<CommentType[]>(`${appConfig.baseUrl}/vacations/${vacationId}/comments`);
    return response.data;
};

export const addComment = async (vacationId: number, userId: number, text: string): Promise<CommentType> => {
    try {
        const response = await axios.post<CommentType>(
            `${appConfig.baseUrl}/vacations/${vacationId}/comments`,
            { userId, text }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
};

export const updateComment = async (comment: CommentType): Promise<CommentType> => {
    try {
        const response = await axios.put<CommentType>(
            `${appConfig.baseUrl}/comments/${comment.id}`,
            comment
        );
        return response.data;
    } catch (error:any) {
        console.error("Error updating comment:", error);
        throw new Error(`Error updating comment: ${error.message}`);
    }
};

export const deleteComment = async (commentId: number): Promise<void> => {
    try {
        await axios.delete<void>(`${appConfig.baseUrl}/comments/${commentId}`);
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error; 
    }
};

