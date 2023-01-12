import * as express from 'express';
import registerRouter from './routes/registerUser.router';
import loginRouter from './routes/login.router';
import accountRouter from './routes/account.router';
import transactionRouter from './routes/transaction.router';
// import teamsRouter from './routes/teams.router';
// import matchesRouter from './routes/matches.router';
// import leaderboardRouter from './routes/leaderboard.router';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH',
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use('/register', registerRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/account', accountRouter);
    this.app.use('/transaction', transactionRouter);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
