const express = require('express');
const router = express.Router();
const bookController = require('bookController');
const auth = require('auth');
const upload = require('../middlewares/upload');

router.get('/', bookController.getAllBooks);
router.post('/', 
    auth, 
    upload.fields([
        { name: 'pdf', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]),
    bookController.createBook
);
router.put('/:id',
    auth,
    upload.fields([
        { name: 'pdf', maxCount: 1 },
        { name: 'cover', maxCount: 1 }
    ]),
    bookController.updateBook
);
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;