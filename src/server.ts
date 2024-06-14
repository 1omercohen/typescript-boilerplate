import { dbConnect } from "./config/db"
import { app } from "./app"

dbConnect()
.then(() => {
    app.listen(8080, () => console.log("server running on port 8080"))
})