import express from 'express';
import isLoggedIn from '../middlewares/login-required.handler';
import validatePassword from '../middlewares/validate-password.handler';
import passport from 'passport';
import upload from '../middlewares/uploadFile.handler';
import UserController from '../controllers/users-controller';
import UserService from '../services/users-service';
import GroupService from '../services/groups-service';
import JoinService from '../services/join-service';
import NotificationService from '../services/notification-service';

const userService = new UserService();
const groupService = new GroupService();
const joinService = new JoinService();
const notificationService = new NotificationService();
const userController = new UserController(
  userService,
  groupService,
  joinService,
  notificationService,
);

const router = express.Router();

router.get('/myProfile', isLoggedIn, userController.getMyInfo);

router.get('/profile/:userId', userController.getUser);

router.post('/signup', userController.signUp);

router.post('/logout', userController.logOut);

router.patch(
  '/profile',
  isLoggedIn,
  upload.single('imageFile'),
  userController.updateUser,
);

router.delete('/', isLoggedIn, validatePassword, userController.deleteUser);

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  userController.signIn,
);

export default router;
