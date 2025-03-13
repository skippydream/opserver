const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware per interpretare il corpo delle richieste in formato JSON
app.use(bodyParser.json());

// Memorizza i dati (in un ambiente di produzione dovresti usare un database)
let lastWatchedEpisode = {
    episode: 1,
    playbackPosition: 0,
    username: '',
    timestamp: ''
};

// Endpoint per ottenere l'episodio salvato
app.get('/api/lastWatchedEpisode', (req, res) => {
    res.json(lastWatchedEpisode);
});

// Endpoint per salvare un nuovo episodio
app.post('/api/lastWatchedEpisode', (req, res) => {
    const { episode, playbackPosition, username, timestamp } = req.body;

    // Verifica che i dati siano validi
    if (typeof episode === 'number' && typeof playbackPosition === 'number' && typeof username === 'string' && typeof timestamp === 'string') {
        lastWatchedEpisode = { episode, playbackPosition, username, timestamp };
        res.status(200).json({ message: 'Episodio salvato correttamente.' });
    } else {
        res.status(400).json({ error: 'Dati non validi.' });
    }
});

// Impostiamo la porta di ascolto (assicurati che sia 8080 per Railway)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
