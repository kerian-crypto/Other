const Book = require('book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('uploadedBy', 'username');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des livres', error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, description, category } = req.body;
        const book = new Book({
            title,
            author,
            description,
            category,
            uploadedBy: req.user.userId,
            pdfUrl: req.files.pdf ? uploads/('req.files.pdf[0].filename'): null,
            coverImageUrl: req.files.cover ? /uploads/('req.files.cover[0].filename'): null,
        });

        await book.save();
        res.status(201).json({ message: 'Livre ajouté avec succès', book });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'ajout du livre', error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (req.files) {
            if (req.files.pdf) {
                updates.pdfUrl = /uploads/('req.${files.pdf[0].filename');
            }
            if (req.files.cover) {
                updates.coverImageUrl = /uploads/ ('req.files.cover[0].filename');
            }
        }

        const book = await Book.findOneAndUpdate(
            { _id: req.params.id, uploadedBy: req.user.userId },
            updates,
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        res.json({ message: 'Livre mis à jour avec succès', book });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du livre', error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({
            _id: req.params.id,
            uploadedBy: req.user.userId
        });

        if (!book) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }

        res.json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du livre', error: error.message });
    }
};