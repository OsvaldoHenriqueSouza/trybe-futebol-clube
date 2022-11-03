import { Request, Response } from 'express';
import LeadBoardService from '../services/LeaderBoardService';

class LeadBoardController {
  constructor(private leadBoardService = new LeadBoardService()) { }

  public getLeadBoardHome = async (req: Request, res: Response) => {
    const homeLeadBoard = await this.leadBoardService.getLeadBoardHome();
    return res.status(200).json(homeLeadBoard);
  };

  public getLeadBoardAway = async (req: Request, res: Response) => {
    const awayLeadBoard = await this.leadBoardService.getLeadBoardAway();
    return res.status(200).json(awayLeadBoard);
  };

  public getLeadBoard = async (req: Request, res: Response) => {
    const leadBoarAll = await this.leadBoardService.getLeadBoard();
    return res.status(200).json(leadBoarAll);
  };
}

export default LeadBoardController;
