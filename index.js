import express from 'express';
import routes from './src/routes/crmRoutes'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = 3000;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Setup bodyparser
app.use(bodyParser.urlencoded({urlencoded: true}));
app.use(bodyParser.json());

// Secure
app.use(helmet());

// Rate Limiter
const limiter = new rateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 100, // Max Request per IP
    delayMs: 0 // disable delays
})

// Setup JWT
app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    {
        jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) {
                req.user = undefined;
            }
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

// Serve Static Files
app.use(express.static('public'));

routes(app);

app.get('/', (req, res) => {
    res.send(`Node and express server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`Server Running on port: ${PORT}`)
});
