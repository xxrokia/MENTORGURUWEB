const { MongoClient } = require('mongodb');

// MongoDB connection
const mongoUri = 'mongodb://localhost:27017';  // Update the connection string if needed
const dbName = 'mentorGuruDB';  // Update the database name if needed
const mongoClient = new MongoClient(`${mongoUri}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await mongoClient.connect();
    console.log('Connected to MongoDB');
    return mongoClient.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
};
