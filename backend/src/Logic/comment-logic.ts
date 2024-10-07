import axios from "axios";
import { CommentType } from "../Models/CommentModel";
import { executeSqlQuery } from "../Utils/dal";
import { OkPacket } from "mysql";
import { appConfig } from "../Utils/appConfig";

// Function to retrieve all comments for a vacation
export const getAllCommentsForVacation = async (vacationId: number): Promise<CommentType[]> => {
    const getAllCommentsQuery = `
        SELECT id, vacation_id AS vacationId, user_id AS userId, text, created_at FROM comments
        WHERE vacation_id = "${vacationId}"
        ORDER BY created_at DESC
    `;

    const comments = await executeSqlQuery(getAllCommentsQuery) as CommentType[];
    return comments;
};

// Function to add a new comment
export const addComment = async (comment: CommentType): Promise<CommentType> => {
    const addCommentQuery = `
        INSERT INTO comments (vacation_id, text, user_id, created_at)
        VALUES ("${comment.vacationId}", "${comment.text}", "${comment.userId}", NOW())
    `;

    const addCommentInfo: OkPacket = await executeSqlQuery(addCommentQuery);

    if (addCommentInfo.affectedRows < 1) {
        throw new Error("Failed to add comment.");
    }

    const newCommentQuery = `
        SELECT id, vacation_id AS vacationId, user_id AS userId, text, created_at FROM comments WHERE id = ${addCommentInfo.insertId}
    `;
    const [newComment] = await executeSqlQuery(newCommentQuery) as CommentType[];

    return newComment;
};

// Function to update a comment
export const updateComment = async (id: number, text: string): Promise<CommentType> => {
    const updateCommentQuery = `
        UPDATE comments
        SET text = "${text}"
        WHERE id = "${id}"
    `;
    
    try {
        await executeSqlQuery(updateCommentQuery);
        const updatedCommentQuery = `
            SELECT id, vacation_id AS vacationId, user_id AS userId, text, created_at 
            FROM comments
            WHERE id = "${id}"
        `;
        const [updatedComment] = await executeSqlQuery(updatedCommentQuery) as CommentType[];
        return updatedComment;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
};


// Function to delete a comment
export const deleteComment = async (commentId: number): Promise<void> => {
    try {
        await axios.delete(`${appConfig.host}/comments/${commentId}`);
    } catch (error) {
        console.error(`Error deleting comment: ${error.message}`);
        throw error;
    }
};

