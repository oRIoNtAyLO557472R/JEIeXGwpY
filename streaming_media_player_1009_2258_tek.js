// 代码生成时间: 2025-10-09 22:58:57
const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const { createFFmpeg, fetchFile } = require('@ffmpeg/ffmpeg');

// Configuration
const PORT = 3000;
const STREAM_SOURCE = './path/to/your/video.mp4'; // Replace with your video file path
const INDEX_PAGE = path.join(__dirname, 'public', 'index.html');

// Create a new instance of the FFmpeg static class
const ffmpeg = createFFmpeg({ log: true });

// Initialize FFmpeg (the library may download FFmpeg binaries if not present)
ffmpeg.load().then(() => {
  console.log('FFmpeg loaded and ready to use.');
}).catch((error) => {
  console.error('Error loading FFmpeg:', error);
});

// Create an Express application
const app = express();

// Use the Morgan middleware for logging HTTP requests
app.use(morgan('dev'));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the index page
app.get('/', (req, res) => {
  fs.readFile(INDEX_PAGE, (err, data) => {
    if (err) {
      res.status(500).send('Error loading index page.');
    } else {
      res.send(data);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the HTTP server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

/*
 * Streaming endpoint for video content
 * This uses FFmpeg to convert the video into a streaming format.
 */
app.get('/stream', async (req, res) => {
  try {
    // Prepare FFmpeg command to stream the video
    const command = ffmpeg
      .input(STREAM_SOURCE)
      .output(`pipe:1`)
      .on('start', (commandLine) => {
        console.log('Spawned FFmpeg with command: ' + commandLine);
      }).on('error', (err) => {
        console.log('An error occurred: ' + err.message);
        res.status(500).send('Error streaming video.');
      }).on('end', () => {
        console.log('Processing finished !');
      });

    // Stream the video to the client
    res.set('Content-Type', 'video/mp4');
    await command.run();
  } catch (error) {
    console.error('Error streaming video:', error);
    res.status(500).send('Error streaming video.');
  }
});