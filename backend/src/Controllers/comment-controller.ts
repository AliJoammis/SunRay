// // In comment-controller.ts

// import express, { NextFunction, Request, Response } from "express";
// import { CommentType } from "../Models/CommentModel";
// import { addComment, getAllCommentsForVacation } from "../Logic/comment-logic";

// const router = express.Router();

// router.get(
//     "/vacations/:id/comments",
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const vacationId = +req.params.id;
//             const comments = await getAllCommentsForVacation(vacationId);
//             res.status(200).json(comments);
//         } catch (err) {
//             next(err);
//         }
//     }
// );

// router.post(
//     "/vacations/:id/comments",
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const { vacationId, userId, text } = req.body;
//             const comment: Omit<CommentType, 'id'> = {
//                 vacationId,
//                 userId,
//                 text
//             };
//             const newComment = await addComment(comment as CommentType);
//             res.status(201).json(newComment);
//         } catch (err) {
//             next(err);
//         }
//     }
// );

// export default router;
