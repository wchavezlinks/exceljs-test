const mongoose = require('mongoose');

(async () => {
  try {
    const db = await mongoose.connect('YOUR MONGO DB URI', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected to: ${db.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();