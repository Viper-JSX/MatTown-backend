//import app from "./server";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";

import app from "./server.js";

const port = process.env.PORT || 1337;

dotenv.config();


//redo into async/await, try/catch
connectToDB()
.then(() => {
    app.listen(port, () => console.log("Server is listening"));
})
.catch((err) => console.log("Cannot connect"));

