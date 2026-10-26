import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
//import dotenv from "dotenv";
//dotenv.config({ path: "../.env" });

const uri = "mongodb+srv://ciphertracer7_db_user:Professionaltools1@cipher.ygyng4b.mongodb.net/";
const client = new MongoClient(uri);

let db;

export async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("cipher");
    console.log("MongoDB conectado");
  }

  return db;
}

export async function controladorDB() {
    const db = await connectDB();

    return db.collection("controlador").findOne()
}
console.log(await controladorDB())



export async function alterarControlador(valor) {
    const db = await connectDB();

    console.log("Valor recebido:", valor);

    const resultado = await db.collection("controlador").updateOne(
        { _id: new ObjectId("6adf65596cee570a242682a8") },
        {
            $set: {
                visible: valor
            }
        }
    );

    console.log("Documentos encontrados:", resultado.matchedCount);
    console.log("Documentos alterados:", resultado.modifiedCount);

    return resultado;
}
