const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //  console.log(process.env.MONGO_URL)
    // mongodb://localhost:27017/shopapp
    //mongodb://ahad:ahad1234@mycluster-shard-00-00.ruutg.mongodb.net:27017,mycluster-shard-00-01.ruutg.mongodb.net:27017,mycluster-shard-00-02.ruutg.mongodb.net:27017/shopapp?ssl=true&replicaSet=atlas-dmfx4m-shard-0&authSource=admin&retryWrites=true&w=majority
    // mongodb+srv://ahad:ahad1234@mycluster.ruutg.mongodb.net/shopapp?retryWrites=true&w=majority
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
