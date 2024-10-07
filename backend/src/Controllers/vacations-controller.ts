import express, { NextFunction, Request, Response } from "express";
import { 
  getAllVacationsLogic, 
  getOneVacationLogic, 
  addOneVacationLogic, 
  updateVacationLogic, 
  deleteVacationLogic, 
  getUpcomingVacations, 
  getCurrentVacations 
} from "../Logic/vacation-logic";
import { VacationType } from "../Models/VacationModel";
import { upload } from "../Middleware/uploadImage";
import { getAllCommentsForVacation, addComment, deleteComment, updateComment } from "../Logic/comment-logic";
import { CommentType } from "../Models/CommentModel";
import { executeSqlQuery } from "../Utils/dal";
import { addRating, getAllRatingsForVacation } from "../Logic/rating-logic";
import { RatingType } from "../Models/RatingModel";

const router = express.Router();

router.get(
  "/vacations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getAllVacationsLogic();
      res.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/vacations/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const vacation = await getOneVacationLogic(id);
      res.status(200).json(vacation);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/vacations", 
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) {
      return res.status(400).send('No file uploaded.');
    }
    try {
      const vacation = req.body as VacationType;
      vacation.image = req.files.filename || '';
      console.log("image : " + vacation.image);
      const newVacation = await addOneVacationLogic(vacation);
      res.status(201).json(newVacation);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/vacations/:id", 
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const vacation = req.body as VacationType;
      vacation.id = +req.params.id;
      vacation.image = req.files?.filename || '';
      console.log("image : " + vacation.image);

      const newVacation = await updateVacationLogic(vacation);
      res.status(200).json(newVacation);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/vacations/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      await deleteVacationLogic(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

// upcoming vacations
router.get(
  "/upcomingvacations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getUpcomingVacations();
      res.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

// Current vacations
router.get(
  "/activevacations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getCurrentVacations();
      res.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/vacations/:id/comments",
  async (req: Request, res: Response, next: NextFunction) => {
      try {
          const vacationId = +req.params.id;
          const comments = await getAllCommentsForVacation(vacationId);
          res.status(200).json(comments);
      } catch (err) {
          next(err);
      }
  }
);


router.post(
  "/vacations/:id/comments",
  async (req: Request, res: Response, next: NextFunction) => {
      try {
          const { id: vacationId } = req.params; 
          const { userId, text } = req.body; 
          const comment: Omit<CommentType, 'id'> = {
              vacationId: +vacationId, 
              userId,
              text
          };

          const newComment = await addComment(comment as CommentType);
          res.status(201).json(newComment);
      } catch (err) {
          next(err);
      }
  }
);
// DELETE comment by commentId
router.delete(
  "/comments/:commentId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { commentId } = req.params;
      await deleteComment(+commentId);
      res.sendStatus(204); // Sending a 204 No Content response on success
    } catch (err) {
      next(err); // Pass any errors to the error handler
    }
  }
);


// PUT update comment by id
router.put(
  "/comments/:id",
  async (req: Request, res: Response, next: NextFunction) => {
      try {
          const { id } = req.params;
          const { text } = req.body;
          const updatedComment = await updateComment(+id, text); 
          res.status(200).json(updatedComment);
      } catch (err) {
          next(err);
      }
  }
);


router.get(
  "/vacations/:id/rating",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacationId = +req.params.id;
      const ratings = await getAllRatingsForVacation(vacationId);
      res.status(200).json(ratings);
  } catch (err) {
      next(err);
  }
  }
)

router.post(
  "/vacations/:id/rating",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: vacation_id } = req.params;
      const { rating , userId } = req.body;
      const newRating: Omit<RatingType, 'id'> = {
        vacationId: +vacation_id,
        rating: rating ,
        userId : userId
      };

      const addedRating = await addRating(newRating as RatingType);
      res.status(201).json(addedRating);
    } catch (err) {
      next(err);
    }
  }
);



export default router;
