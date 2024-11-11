const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('authRoutes');
const bookRoutes = require('bookRoutes');

const app = express();

// Inscription
POST /api/auth/register
Body: {
    "username": "user1",
    "email": "user1@example.com",
    "password": "password123"
}

// Connexion
POST /api/auth/login
Body: {
    "email": "user1@example.com",
    "password": "password123"
}

// Ajouter un livre (avec FormData)
POST /api/books
Headers: {
    "Authorization": "Bearer votre_token"
}
FormData:
- title: "Titre du livre"
- author: "Auteur"
- description: "Description"
- category: "Catégorie"
- pdf: [fichier PDF]
- cover: [fichier image]

// Obtenir tous les livres
GET /api/books

// Mettre à jour un livre
PUT /api/books/:id
Headers: {
    "Authorization": "Bearer votre_token"
}
FormData: (mêmes champs que pour l'ajout)

// Supprimer un livre
DELETE /api/books/:id
Headers: {
    "Authorization": "Bearer votre_token"
}

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Connection à la base de données
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Serveur en cours d\'exécution sur le port ${PORT}');
});

