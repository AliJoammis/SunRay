// Import necessary modules and types
import { executeSqlQuery } from "../Utils/dal";
import { OkPacket } from "mysql";
import { RatingType } from "../Models/RatingModel";

// Function to retrieve all ratings for a vacation
export const getAllRatingsForVacation = async (vacationId: number): Promise<RatingType[]> => {
    const getAllRatingsQuery = `
       SELECT id, vacation_id AS vacationId, user_id AS userId, rating FROM ratings
       WHERE vacation_id = "${vacationId}"
    `;

    const ratings = await executeSqlQuery(getAllRatingsQuery) as RatingType[];
    return ratings;
};

// Function to add or update a rating
export const addRating = async (rating: RatingType): Promise<RatingType> => {
    let newRating: RatingType;

    const { vacationId, userId, rating: newRatingValue } = rating;

    // Check if the user has already rated this vacation
    const existingRatingQuery = `
        SELECT id FROM ratings
        WHERE vacation_id = "${vacationId}" AND user_id = "${userId}"
    `;
    const existingRating = await executeSqlQuery(existingRatingQuery) as RatingType[];

    if (existingRating.length > 0) {
        // Update existing rating
        const updateRatingQuery = `
            UPDATE ratings
            SET rating = "${newRatingValue}"
            WHERE vacation_id = "${vacationId}" AND user_id = "${userId}"
        `;
        await executeSqlQuery(updateRatingQuery);

        // Retrieve updated rating
        const updatedRatingQuery = `
            SELECT id, vacation_id AS vacationId, user_id AS userId, rating
            FROM ratings
            WHERE vacation_id = "${vacationId}" AND user_id = "${userId}"
        `;
        const [updatedRating] = await executeSqlQuery(updatedRatingQuery) as RatingType[];
        newRating = updatedRating;
    } else {
        // Add new rating
        const addRatingQuery = `
            INSERT INTO ratings (vacation_id, user_id, rating)
            VALUES ("${vacationId}", "${userId}", "${newRatingValue}")
        `;
        const addRatingInfo: OkPacket = await executeSqlQuery(addRatingQuery);

        if (addRatingInfo.affectedRows < 1) {
            throw new Error("Failed to add rating.");
        }

        // Retrieve the newly added rating
        const newRatingQuery = `
            SELECT id, vacation_id AS vacationId, user_id AS userId, rating
            FROM ratings
            WHERE id = ${addRatingInfo.insertId}
        `;
        const [addedRating] = await executeSqlQuery(newRatingQuery) as RatingType[];
        newRating = addedRating;
    }

    return newRating;
};
