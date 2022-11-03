import { Router } from 'express';
import LeaderBoardController from '../controllers/LeadBoardController';

const router = Router();

const leaderBoardController = new LeaderBoardController();

router.get('/', leaderBoardController.getLeadBoardHome);

export default router;
