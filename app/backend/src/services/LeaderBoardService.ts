import sequelize from '../database/models';
import leadBoardHome from '../helpers/leadBoardHome';
import leadBoardAway from '../helpers/leadBoardAway';
import leadBoard from '../helpers/leadBoard';

class LeadBoardService {
  constructor(private model = sequelize) { }

  public async getLeadBoardHome() {
    const [homeLeadBoard] = await this.model.query(leadBoardHome);
    return homeLeadBoard;
  }

  public async getLeadBoardAway() {
    const [awayLeadBoard] = await this.model.query(leadBoardAway);
    return awayLeadBoard;
  }

  public async getLeadBoard() {
    const [leadBoarAll] = await this.model.query(leadBoard);
    return leadBoarAll;
  }
}

export default LeadBoardService;
