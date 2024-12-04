const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB);
    console.log(' MONGODB CONNECTED SUCCESFULLY ');
    // Check and create default environment variables
    for (const envVar of defaultEnvVariables) {
      const existingVar = await EnvVar.findOne({ userId: envVar.userId, key: envVar.key });
      if (!existingVar) {
        // Create new environment variable with default value
        await EnvVar.create({ userId: envVar.userId, ...envVar });
        console.log(` CREATED DEFAULT ENV VAR: ${envVar.key} for user ${envVar.userId}`);
      }
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
