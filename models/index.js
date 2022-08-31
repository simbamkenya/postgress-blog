const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://rxmpxcko:WHAuwM7-U2nz1wDShG3H1e2aqh2VWc7o@heffalump.db.elephantsql.com/rxmpxcko')

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.posts = require('./post.model.js')(sequelize, Sequelize)
module.exports = db;

