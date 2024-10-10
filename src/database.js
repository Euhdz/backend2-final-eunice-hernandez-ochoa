import mongoose, { mongo } from "mongoose";

import configObject from "./config/config.js";
const { mongo_url } = configObject;
//El siguiente codigo asegura que solo exista una instancia de la base de datos, para evitarcostos por conexiones a base de datos de paga por error en el codigo
class Database {
  static #instance; //static significa que es una propiedad de la clase y # significa que es privada de esta clase
  constructor() {
    mongoose.connect(mongo_url);
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Ya existe una instancia de la base de datos");
      return this.#instance;
    }
    this.#instance = new Database();
    console.log("Se ha creado una nueva instancia de la base de datos");
    return this.#instance;
  }
}

export default Database.getInstance();
