import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

//------------route for getting user from DB------------
router.get('/get-all-users', userControllers.getAllUsers);

//------------route for getting users count from DB------------
router.get('/get-all-users-count', userControllers.getAllUsersCount);

//------------route for getting user from DB------------
router.get('/get-speicific-user/:id', userControllers.getUser);

export const userRoutes = router;
