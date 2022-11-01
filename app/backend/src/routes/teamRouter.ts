import { Router } from 'express';
import TeamsController from '../controllers/TeamController';

const router = Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAllTemas);
router.get('/:id', teamsController.getByIdTeam);

export default router;
