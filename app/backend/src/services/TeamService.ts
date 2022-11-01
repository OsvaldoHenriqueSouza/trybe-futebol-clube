import Teams from '../database/models/TeamsModel';
import ITeam from '../interfaces/ITeam';

class TeamsService {
  private model = Teams;

  public async getAllTeams(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll({ raw: true });
    return allTeams;
  }

  public async getByIdTeam(id: string): Promise<ITeam> {
    const team = await this.model.findByPk(id);
    return team as ITeam;
  }
}

export default TeamsService;
