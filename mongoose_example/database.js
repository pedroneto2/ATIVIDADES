// Mongoose
// - Vai nos ajudar a conectar em qualquer banco de dados MongoDB de uma forma Rápida e simples
// - Ele nos ajuda a criar um padrão para as nossas coleções
// - Ele abstrai as queries de CRUD através de métodos

const mongoose = require("mongoose");
const Dinossaur = require("./Dinossaur");

const connectToDb = async () => {
  try {
    // Para nomear a DB, colocar na frente de "mongodb://localhost:27017/"
    await mongoose.connect("mongodb://localhost:27017/Dinossaurs");
    console.log("Successfully connect to database!");

    const dino = {
      name: "T-Rex",
      paws: 4,
      period: "jurassic",
    };

    const dinoToDB = new Dinossaur(dino);
    await dinoToDB.save();

    const dinosFromDB = await Dinossaur.find();
    console.log(dinosFromDB);

    const spino = await Dinossaur.findOne({ name: "T-Rex" });
    await Dinossaur.findOneAndUpdate(
      { _id: spino._id },
      { name: "Tyrannossaur Rex" }
    );

    const dinosFromDB2 = await Dinossaur.find();
    console.log(dinosFromDB2);
  } catch (error) {
    console.log(error);
  }
};

connectToDb();
