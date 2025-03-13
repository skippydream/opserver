const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware per interpretare il corpo delle richieste in formato JSON
app.use(bodyParser.json());

// Oggetto per memorizzare i dati degli utenti (in un ambiente di produzione dovresti usare un database)
let userProfiles = {};

// Endpoint per ottenere l'episodio salvato di un determinato utente
app.get('/api/lastWatchedEpisode/:username', (req, res) => {
    const username = req.params.username;
    
    // Verifica se esistono dati per l'utente
    if (userProfiles[username]) {
        res.json(userProfiles[username]);
    } else {
        res.status(404).json({ error: 'Profilo utente non trovato.' });
    }
});

// Endpoint per salvare un nuovo episodio per un determinato utente
app.post('/api/lastWatchedEpisode', (req, res) => {
    const { episode, playbackPosition, username, timestamp } = req.body;

    // Verifica che i dati siano validi
    if (typeof episode === 'number' && typeof playbackPosition === 'number' && typeof username === 'string' && typeof timestamp === 'string') {
        // Se l'utente non esiste, crea il suo profilo
        if (!userProfiles[username]) {
            userProfiles[username] = {};
        }

        // Salva i dati dell'episodio per l'utente specificato
        userProfiles[username] = { episode, playbackPosition, username, timestamp };
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
