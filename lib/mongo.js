const {
  MongoClient
} = require('mongodb')
const {
  config
} = require('../config')

const USER = encodeURIComponent(config.dbUser)
const PASS = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName

const MONGO_URI = `mongodb://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}` // pretier-ignore
class MongoLib {
  constructor () {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true
    })
    this.dbName = DB_NAME
  }

  connect () {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if (error) {
          reject(error)
        }

        console.log('Connected succesfully to mongo')
      })
    })
  }

  getAll (collection, query) {
    return this.connect().then(db => {
      return db.collection(collection)
        .find(query)
        .toArray()
    })
  }
}

module.exports = MongoLib
