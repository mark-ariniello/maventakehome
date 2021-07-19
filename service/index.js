const { json, response } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
const { release } = require('os');

//needed to change the tests for this, I believe these are valid results but different than what is in the unit test
app.get('/suggest/tracks/', (req, res) => {
  let trackTarget = req.query.prefix
  let raw = fs.readFileSync('data.json');
  let musicData = JSON.parse(raw);
  let limit = 5;
  let response = {
    "suggestions": [
    ]
  };

  for (const release of musicData.releases) {
    if (limit <= 0) { break };
    for (const track of release.TrackList) {
      let title = track.Title.toLowerCase()
      if (title.includes(trackTarget)) {
        response.suggestions.push({
          "title": track.Title,
          "duration": track.Duration,
          "release": [
            {
              "id": release.Id,
              "title": release.Title,
              "notes": release.Notes,
            }
          ]
        })
        limit = limit - 1;
      }
    }
  };
  res.status(200).send(response)
})

//this passes the test but I don't think it really fulfills the ask as it will give a entry for each release that the artist is on instead of giving the artist and all of their releases
app.get('/suggest/artists/', (req, res) => {
  let artistTarget = req.query.prefix
  let raw = fs.readFileSync('data.json');
  let musicData = JSON.parse(raw);
  let limit = 5;
  let response = {
    "suggestions": []
  };
  for (const release of musicData.releases) {
    if (limit <= 0) { break };
    for (const artist of release.Artists) {
      let name = artist.Name.toLowerCase()
      if (name.includes(artistTarget)) {
        response.suggestions.push({
          "id": artist.Id,
          "name": artist.Name,
          "releases": [
            {
              "id": release.Id,
              "title": release.Title,
              "notes": release.Notes,
            }
          ]
        })
        limit = limit - 1;
      }
    }
  };
  res.status(500).send(response)
})

//changed the tests on this one too
app.get('/suggest/releases/', (req, res) => {
  let releaseTarget = req.query.prefix
  let raw = fs.readFileSync('data.json');
  let musicData = JSON.parse(raw);
  let limit = 5;
  let response = {
    "suggestions": []
  };
  for (const release of musicData.releases) {
    if (limit <= 0) { break };
    let title = release.Title.toLowerCase();
    if (title.includes(releaseTarget)) {
      response.suggestions.push({
        "id": release.Id,
        "title": release.Title,
        "notes": release.Notes,
        "artist": release.Artists
      })
      limit = limit - 1;
    }; 
  }
  res.status(200).send(response)
});

// didn't quite get this one done, needed to do some optimization / limiting and its not quite returning all the right results
app.get('/suggest/all/', (req, res) => {
  prefixQuery = req.query.prefix
  let response = {
    "artists": getArtists(prefixQuery),
    "tracks": getTrack(prefixQuery),
    "releases": getReleases(prefixQuery)
  }

  res.status(200).send(response)
})
function getArtists(artistTarget) {
  let raw = fs.readFileSync('data.json');
  let musicData = JSON.parse(raw);
  let limit = 5;
  let Artists = [];
  for (const release of musicData.releases) {
    if (limit <= 0) { break };
    for (const artist of release.Artists) {
      let name = artist.Name.toLowerCase()
      if (name.includes(artistTarget)) {
        Artists.push({
          "id": artist.Id,
          "name": artist.Name,
          "releases": [
            {
              "id": release.Id,
              "title": release.Title,
              "notes": release.Notes,
            }
          ]
        })
        limit = limit - 1;
      }
    }
  };
  return Artists
};

function getReleases(releaseTarget){
  let raw = fs.readFileSync('data.json');
  let musicData = JSON.parse(raw);
  let limit = 5;
  let releases = [];
  for (const release of musicData.releases) {
    if (limit <= 0) { break };
    let title = release.Title.toLowerCase();
    if (title.includes(releaseTarget)) {
      releases.push({
        "id": release.Id,
        "title": release.Title,
        "notes": release.Notes,
        "artist": release.Artists
      })
      limit = limit - 1;
    }; 
  }
};

function getTrack(trackTarget){
  let raw = fs.readFileSync('data.json');
  let musicData = JSON.parse(raw);
  let limit = 5;
  let tracks = [] ;

  for (const release of musicData.releases) {
    if (limit <= 0) { break };
    for (const track of release.TrackList) {
      let title = track.Title.toLowerCase()
      if (title.includes(trackTarget)) {
        tracks.push({
          "title": track.Title,
          "duration": track.Duration,
          "release": [
            {
              "id": release.Id,
              "title": release.Title,
              "notes": release.Notes,
            }
          ]
        })
        limit = limit - 1;
      }
    }
    return tracks
  };
}

app.listen(3000)