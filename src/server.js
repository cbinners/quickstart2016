import bodyParser from 'body-parser';
import config from 'config';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import session from 'express-session';

import routes from './routes';
import db from './db';

class Server {
  static start() {
    const app = express();
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
      secret: 'your_secret',
      cookie: { domain: 'your_domain' },
      resave: false,
      saveUninitialized: false
    }));
    // Install the api routes
    routes(app);

    const server = http.Server(app);

    // Clear and rebuild the database schema on reload.
    // You should ideally create migrations to build up your schema,
    // but this is useful for development
    db.sequelize.sync({ force: true }).then(() => {
      console.log('Database cleared and created');
      server.listen(3000, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Server started on port 3000');
      });
    });
  }
}

module.exports = Server;
