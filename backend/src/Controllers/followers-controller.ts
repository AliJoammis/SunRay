import express, { NextFunction, Request, Response } from "express";
import { 
  getAllFollowersRecordssLogic,
  getAllUsersFollowingParticularVacationLogic,
  getAllVacationsUserIsFollowingLogic,
  addRecordUserFollowingVacationLogic,
  removeRecordUserFollowingVacationLogic,
  getOneFollowerRecordLogic,
  updateFollowersCountLogic,
  getNumberOfUsersFollowingParticularVacation,
  getAllVacationsWithNumOfFollowers,
  getFollowedVacationsWithNumOfFollowers
} from "../Logic/follower-logic";
import { FollowerType } from "../Models/FollowerModel";
import { VacationWithNumOfFollowers } from "../Models/VacationWithNumOfFollowers";

const router = express.Router();

// Get all followers for all vacations
router.get(
  "/followers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allFollowersRecords = await getAllFollowersRecordssLogic();
      res.status(200).json(allFollowersRecords);
    } catch (err) {
      next(err);
    }
  }
);

// Get one follower record (user following a vacation)
router.get(
  "/followers/:user_id/:vacation_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = +req.params.user_id;
      const vacation_id = +req.params.vacation_id;
      const follower = await getOneFollowerRecordLogic({ user_id, vacation_id });
      res.status(200).json(follower);
    } catch (err) {
      next(err);
    }
  }
);

// Get all vacations a user is following
router.get(
  "/followed/:user_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = +req.params.user_id;
      const vacations = await getAllVacationsUserIsFollowingLogic(user_id);
      res.status(200).json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

// Get all users following a particular vacation
router.get(
  "/followers/:vacation_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacation_id = +req.params.vacation_id;
      const users = await getAllUsersFollowingParticularVacationLogic(vacation_id);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
);

// Add new follower
router.post(
  "/followers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const follower = req.body as FollowerType;
      const newFollower = await addRecordUserFollowingVacationLogic(follower);
      res.status(201).json(newFollower);
    } catch (err) {
      next(err);
    }
  }
);

// Remove follower
router.delete(
  "/unfollow/:user_id/:vacation_id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user_id = +req.params.user_id;
      const vacation_id = +req.params.vacation_id;
      await removeRecordUserFollowingVacationLogic({ user_id, vacation_id });
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

// Update followers count in DB
router.post('/updateFollowers/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = +req.params.id;
  const { likes } = req.body;  // Ensure this destructures likes from req.body

  try {
    const updatedLikes = await updateFollowersCountLogic(id, likes);
    res.status(200).json(updatedLikes);
  } catch (error) {
    next(error);  // Pass the error to the next middleware (error handler)
  }
});


  //get number of users following a particular vacation
  router.get(
    "/followersnumber/:vacation_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const vacation_id = +req.params.vacation_id;
        const followersNumber = await getNumberOfUsersFollowingParticularVacation(vacation_id);
        res.status(200).json(followersNumber);
      } catch (err) {
        next(err);
      }
    }
  );


  //get number of users following a particular vacation
  router.get(
    "/followersnumber",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const vacationsWithfollowers = await getAllVacationsWithNumOfFollowers();
        res.status(200).json(vacationsWithfollowers);
      } catch (err) {
        next(err);
      }
    }
  );
  
// Get all vacations a user is following with number of followers for each vacation
  router.get(
    "/followedwithfollowers/:user_id",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user_id = +req.params.user_id;
        const followedVacations = await getFollowedVacationsWithNumOfFollowers(user_id) as VacationWithNumOfFollowers[];
        res.status(200).json(followedVacations);
      } catch (err) {
        next(err);
      }
    }
  );


export default router;
