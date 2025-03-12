const express = require('express');
const app = express();

// Middleware per il parsing dei JSON nel corpo della richiesta
app.use(express.json());

// Endpoint POST per salvare l'episodio
app.post('/api/save_episode', (req, res) => {
    const { episode, playbackPosition } = req.body;

    // Verifica che i dati siano presenti nel corpo della richiesta
    if (!episode || !playbackPosition) {
        return res.status(400).json({ error: 'Mancano i dati necessari' });
    }

    // Logica per salvare i dati, ad esempio in un database
    // Qui potresti fare qualcosa come salvare su database

    console.log(`Episodio salvato: ${episode}, posizione: ${playbackPosition}`);

    // Risposta JSON di successo
    res.status(200).json({ message: 'Episodio salvato con successo' });
});

// Avvio del server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
