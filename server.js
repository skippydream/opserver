const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Per gestire il body delle richieste POST (necessario per leggere i dati JSON)
app.use(express.json());

// Variabile per memorizzare l'episodio (può essere sostituita con un database)
let lastWatchedEpisode = {
    episode: 10,
    playbackPosition: 1200.0 // posizione in secondi
};

// Endpoint GET per ottenere l'episodio
app.get('/api/get_episode', (req, res) => {
    res.json(lastWatchedEpisode);
});

// Endpoint POST per salvare l'episodio
app.post('/api/save_episode', (req, res) => {
    const { episode, playbackPosition } = req.body;

    // Verifica se i dati sono validi
    if (typeof episode === 'number' && typeof playbackPosition === 'number') {
        // Salva i dati
        lastWatchedEpisode = { episode, playbackPosition };
        console.log('Dati salvati:', lastWatchedEpisode);
        
        // Rispondi con un messaggio di successo
        res.status(200).json({ message: 'Episodio salvato con successo!' });
    } else {
        // Rispondi con errore se i dati non sono validi
        res.status(400).json({ error: 'Dati non validi.' });
    }
});

// Avvia il server
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
