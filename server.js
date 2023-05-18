const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

// Middleware to parse JSON data
app.use(express.json());

// Read JSON data from file
const videosListFile = fs.readFileSync('video-list.json');
const videosList = JSON.parse(videosListFile);

const videoDetailsFile = fs.readFileSync('video-details.json');
const videoDetails = JSON.parse(videoDetailsFile);


// GET endpoint to retrieve the list of videos
app.get('/videos', (req, res) => {
  res.json(videosList);
});

// GET endpoint to filter videos by ID
app.get('/videos/:id', (req, res) => {
  const id = req.params.id;
  const filteredVideo = videoDetails.find(video => video.id === id);
  
  if (filteredVideo) {
    res.json(filteredVideo);
  } else {
    res.status(404).json({ error: 'Video not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
