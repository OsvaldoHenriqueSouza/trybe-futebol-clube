import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      const allMatches = await this.matchesService.getAllMatches();
      return res.status(200).json(allMatches);
    }
    let key = true;
    if (inProgress !== 'true') key = false;
    const matchesInProgress = await this.matchesService.matchesProgress(key);
    return res.status(200).json(matchesInProgress);
  };

  public newMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const insertNewMatch = await
    this.matchesService.newMatch({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals });
    return res.status(201).json(insertNewMatch);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateScote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchesService.updateScore(Number(id), homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Score Updated' });
  };
}

export default MatchesController;
