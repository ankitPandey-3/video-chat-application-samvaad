import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { checkAuth } from './middlewares/auth.middleware.js'
//import routes
import AUTHROUTER from './routes/users.route.js'
import CHATROUTER from './routes/chat.route.js'
import MESSAGEROUTER from './routes/message.route.js'
const app = express();

console.log(process.env.CORS_ORIGIN, "=============");
//Middlewares
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        // maxAge: 24000,
    }
));

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://samvaad-chi.vercel.app');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// app.use(cors());

app.get('/', (req, res)=> {
    res.send('API is running..')
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkAuth);

//initialize routes
app.use('/api/v1/auth', AUTHROUTER);
app.use('/api/v1/chat', CHATROUTER);
app.use('/api/v1/message', MESSAGEROUTER);

// -------------------deployment-------------------
// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname1, "..", "Client", "dist")));

//     app.get("*", (req, res) =>
//         res.sendFile(path.resolve(__dirname1, "..", "Client", "dist", "index.html"))
//     );
// } else {
//     app.get("/", (req, res) => {
//         res.send("API is running..");
//     });
// }

// -------------------deployment-------------------

export { app };



