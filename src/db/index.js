import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from 'config';

import cls from 'continuation-local-storage';

// Set up continuation-local-storage for easy transaction scopes.
const namespace = cls.createNamespace('your_namespace');
Sequelize.cls = namespace;

const dbConfig = config.db.config;
dbConfig.logging = false;

const seq = new Sequelize(config.db.database, config.db.username, config.db.password, dbConfig);
const db = {};
db.models = [];

// Read the sequelize models
fs.readdirSync(__dirname).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach((file) => {
  const model = seq.import(path.join(__dirname, file));
  db[model.name] = model;
  db.models.push(model);
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = seq;
db.Sequelize = Sequelize;

export default db;
