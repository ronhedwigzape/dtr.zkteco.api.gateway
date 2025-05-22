import express from 'express';
import cors from 'cors';
import ingestRoute from './routes/ingest';
import logsRoute from './routes/logs';

const app = express();

// CORS: allow only your frontend origin if you like
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

app.use(express.json());

// routes
app.use(ingestRoute);
app.use(logsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 DTR ZKTECOAPI Gateway listening on port ${PORT}`);
});
