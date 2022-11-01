import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import INewMatch from '../interfaces/INewMatch';

class MatchesService {
  private model = Matches;

  public async getAllMatches(): Promise<Matches[]> {
    const allMatches = await this.model.findAll({
      include: [{ model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] } },
      { model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] } }] });
    return allMatches;
  }

  public async matchesProgress(condition: boolean): Promise<Matches[]> {
    const matchesInProgress = await this.model.findAll({
      where: { inProgress: condition },
      include: [{ model: Teams,
        as: 'teamHome',
        attributes: { exclude: ['id'] } },
      { model: Teams,
        as: 'teamAway',
        attributes: { exclude: ['id'] } }],
    });
    return matchesInProgress;
  }

  public async newMatch(match: INewMatch): Promise<Matches> {
    const insertNewMatch = await this.model.create({ ...match, inProgress: true });
    return insertNewMatch;
  }

  public async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  public async updateScore(id: number, homeTeamGoals: number, awayTeamGoals: number):
  Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }
}

export default MatchesService;
