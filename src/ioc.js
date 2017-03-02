const autonode = require('../libraries/autonode');

const knex = require('knex');

const dbConfig = require('./config/dbconfig');
const TYPES = require('./models').types;
const repositories = require('./repository');

const containerBuilder = new autonode.ContainerBuilder();

const stack = process.env.STACK || 'development';
const knexInstance = knex(dbConfig[stack]);

// Register all the repositories
containerBuilder.registerType(TYPES.Address, repositories.AddressRepository, autonode.LifetimeScope.InstancePerRequest);
containerBuilder.registerType(TYPES.User, repositories.UserRepository, autonode.LifetimeScope.InstancePerRequest);
containerBuilder.registerValue(TYPES.Knex, knexInstance, autonode.LifetimeScope.SingleInstance);

autonode.Container.load(containerBuilder);

module.exports = autonode;

