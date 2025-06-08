const express = require('express');
const app = express();

// Middleware per interpretare il corpo delle richieste in formato JSON
app.use(express.json());

// Oggetto per memorizzare i dati degli utenti (in un ambiente di produzione dovresti usare un database)
let userProfiles = {};

// Test di base sulla root per verificare che il server sia vivo
app.get('/', (req, res) => {
    console.log('GET / chiamata');
    res.send('Server Express attivo!');
});

// Endpoint per ottenere l'episodio salvato di un determinato utente
app.get('/api/lastWatchedEpisode/:username', (req, res) => {
    console.log(`GET /api/lastWatchedEpisode/${req.params.username} chiamata`);

    const username = req.params.username;
    
    if (userProfiles[username]) {
        console.log('Profilo trovato:', userProfiles[username]);
        res.json(userProfiles[username]);
    } else {
        console.log('Profilo non trovato');
        res.status(404).json({ error: 'Profilo utente non trovato.' });
    }
});

// Endpoint per salvare un nuovo episodio per un determinato utente
app.post('/api/lastWatchedEpisode', (req, res) => {
    console.log('POST /api/lastWatchedEpisode chiamata con body:', req.body);

    const { episode, playbackPosition, username, timestamp } = req.body;

    // Verifica che i dati siano nel formato corretto
    if (
        typeof episode === 'number' && 
        typeof playbackPosition === 'number' && 
        typeof username === 'string' && 
        typeof timestamp === 'string'
    ) {
        // Salva i dati nel profilo dell'utente
        userProfiles[username] = { episode, playbackPosition, username, timestamp };
        console.log('Episodio salvato:', userProfiles[username]);
        res.status(200).json({ message: 'Episodio salvato correttamente.' });
    } else {
        console.log('Dati non validi:', req.body);
        res.status(400).json({ error: 'Dati non validi. Assicurati che tutti i campi siano corretti.' });
    }
});

// Log di avvio per il server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
    console.log("Il server è pronto a ricevere richieste!");
});
