
import app from './app.ts';
import connectDB from './config/database.ts';
const port = process.env.PORT || 8080;
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`App is on port>>`, port);
    });
}).catch((e: Error) => {
    console.log("Error getting connected to DB", e);
});