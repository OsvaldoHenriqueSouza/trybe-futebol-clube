import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import auth from '../middleware/auth';
import validateFieldTemas from '../middleware/validateFieldTeams';
import validateExistsTeams from '../middleware/validateExistsTeams';

const router = Router();

const matchesController = new MatchesController();

router.put('/:id/finish', matchesController.updateMatch);
router.put('/:id', matchesController.updateScote);
router.get('/', matchesController.getAllMatches);
router.post('/', auth, validateFieldTemas, validateExistsTeams, matchesController.newMatch);

export default router;
