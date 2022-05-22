// Import the express in typescript file
import express, { Express, Request, Response } from 'express';

// Initialize the express engine
const app: Express = express();

app.use(express.json())

app.get('/getJSON', (req: Request, res: Response) => {
  res.json([
    {
      date: '2022-05-22T00:00:00.000Z',
      events: [
        {
          id: 1,
          title: "Excursie",
          description: "Mergem la munte",
          startDate: '2022-05-22T10:00:00.000Z',
          endDate: '2022-05-23T12:00:00.000Z',
          hasNext: true,
          priority: 100,
          colorIndex: 1
        }
      ]
    },
    {
      date: '2022-05-23T00:00:00.000Z',
      events: [
        {
          id: 1,
          title: "Excursie",
          description: "Mergem la munte",
          startDate: '2022-05-22T10:00:00.000Z',
          endDate: '2022-05-23T12:00:00.000Z',
          hasNext: false,
          priority: 100,
          colorIndex: 1
        }
      ]
    }
  ])
})

export default {
  path: '/api',
  handler: app
}