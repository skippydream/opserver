const express = require('express');
const app = express();

// Middleware per interpretare il corpo delle richieste in formato JSON
app.use(express.json());

// Oggetto per memorizzare i dati degli utenti (in un ambiente di produzione dovresti usare un database)
let userProfiles = {};

// Endpoint per ottenere l'episodio salvato di un determinato utente
app.get('/api/lastWatchedEpisode/:username', (req, res) => {
    console.log(`GET /api/lastWatchedEpisode/${req.params.username} chiamata`);
    const username = req.params.username;
    
    if (userProfiles[username]) {
        res.json(userProfiles[username]);
    } else {
        res.status(404).json({ error: 'Profilo utente non trovato.' });
    }
});

// Endpoint per salvare un nuovo episodio per un determinato utente
app.post('/api/lastWatchedEpisode', (req, res) => {
    console.log('POST /api/lastWatchedEpisode chiamata con body:', req.body);
    const { episode, playbackPosition, username, timestamp } = req.body;

    if (typeof episode === 'number' && typeof playbackPosition === 'number' && typeof username === 'string' && typeof timestamp === 'string') {
        userProfiles[username] = { episode, playbackPosition, username, timestamp };
        res.status(200).json({ message: 'Episodio salvato correttamente.' });
    } else {
        res.status(400).json({ error: 'Dati non validi.' });
    }
});

// Test di base sulla root per verificare che il server sia vivo
app.get('/', (req, res) => {
    res.send('Server Express attivo!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
