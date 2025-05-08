# Find the Fugitive Game Backend API

This is the backend service for the "Find the Fugitive" game, providing RESTful APIs for game functionality.

## Live API
Base URL: [https://game-gilt-rho.vercel.app/api/cities](https://game-gilt-rho.vercel.app/api/cities)

## API Endpoints

### Cities
- `GET /cities` - Get list of all available cities with distances

### Vehicles
- `GET /vehicles` - Get list of all available vehicles with their specifications

### Cops
- `GET /cops` - Get list of all police officers

### Game Operations
- `POST /start-game` - Initialize a new game session
- `POST /cop-selection` - Submit a cop's city and vehicle selection
- `POST /game/result` - Get the game result after all selections

## Request/Response Examples

### City Response
```json
[
  {
    "name": "string",
    "distance": number
  }
]
```

### Vehicle Response
```json
[
  {
    "type": "string",
    "range": number,
    "count": number
  }
]
```

### Cop Selection Request
```json
{
  "copId": number,
  "city": "string",
  "vehicle": "string"
}
```

### Game Result Response
```json
{
  "success": boolean,
  "capturingCop": number | null,
  "fugitiveLocation": {
    "name": "string",
    "distance": number
  },
  "message": "string",
  "caught": boolean,
  "fugitiveCity": "string",
  "capturingCopId": number | null
}
```

## Deployment
This backend is deployed on Vercel.

## Tech Stack
- Node.js
- Express.js
- Vercel (Hosting)
