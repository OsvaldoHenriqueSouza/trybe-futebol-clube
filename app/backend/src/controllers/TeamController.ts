import { Request, Response } from 'express';
import TeamsService from '../services/TeamService';

class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAllTemas = async (req: Request, res: Response) => {
    const allTeams = await this.teamsService.getAllTeams();
    return res.status(200).json(allTeams);
  };

  public getByIdTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamsService.getByIdTeam(id);
    return res.status(200).json(team);
  };
}

export default TeamsController;
