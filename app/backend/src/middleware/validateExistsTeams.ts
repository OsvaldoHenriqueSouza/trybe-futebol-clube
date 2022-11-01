import { NextFunction, Request, Response } from 'express';
import Teams from '../database/models/TeamsModel';

const validateExistsTeams = async (req:Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const team1 = await Teams.findOne({ where: { id: homeTeam } });
  const team2 = await Teams.findOne({ where: { id: awayTeam } });

  if (!team1 || !team2) {
    return res.status(404).json({
      message: 'There is no team with such id!',
    });
  }

  next();
};

export default validateExistsTeams;
