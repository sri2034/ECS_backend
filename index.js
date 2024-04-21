// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 3001; // Different from the frontend port

// app.use(cors());
// app.use(bodyParser.json());

// let coordinates = { lat: "Not set", lon: "Not set" }; // Store coordinates in memory

// app.post('/update_location', (req, res) => {
//     const { lat, lon } = req.body;
//     coordinates = { lat, lon }; // Update coordinates
//     res.send(`Coordinates updated to Latitude: ${lat}, Longitude: ${lon}`);
// });

// app.get('/location', (req, res) => {
//     res.json(coordinates);
// });

// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // Different from the frontend port
app.use(cors());
app.use(express.json()); // Use express built-in body-parser

let coordinates = { lat: "Not set", lon: "Not set" }; // Store coordinates in memory

app.post('/update_location', (req, res) => {
    const { lat, lon } = req.body;
    
    if (typeof lat !== 'number' || typeof lon !== 'number') {
        return res.status(400).send('Invalid latitude or longitude; must be numbers.');
    }

    coordinates = { lat, lon }; // Update coordinates
    res.send(`Coordinates updated to Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}`);
});

app.get('/location', (req, res) => {
    if (coordinates.lat === "Not set" || coordinates.lon === "Not set") {
        res.status(503).json({ error: "Location not set" });
    } else {
        res.json(coordinates);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
