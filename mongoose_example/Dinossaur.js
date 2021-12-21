const mongoose = require("mongoose");

// 1) Declara o Schema do nosso Dinossauro (padrão de cada documento)
const dinossaurSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    paws: { type: Number, required: true, min: 2, max: 10000 },
    period: {
      type: String,
      required: true,
      enum: ["jurassic", "mesosoic", "triassic"],
    },
    extinct: { type: Boolean, default: true },
  },
  { timestamps: true } // anota a data FULL de quando foi criada e updateada
);

// 2) Declarar o nome da nossa coleção (dinossaur)
const dinossaur = mongoose.model("dinossaur", dinossaurSchema);

module.exports = dinossaur;
