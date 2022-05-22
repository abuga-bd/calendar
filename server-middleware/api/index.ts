// Import the express in typescript file
import express, { Express, Request, Response } from 'express';

// Initialize the express engine
const app: Express = express();
 
app.use(express.json())

app.get('/getJSON', (req: Request, res: Response) => {
  res.json({ data: 'data' })
})

export default {
  path: '/api',
  handler: app
}