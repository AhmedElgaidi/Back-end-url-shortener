const express = require('express');

// Import my url controller
const urlController = require('../controllers/urlController');

// Create my express router instance
const router = express.Router();

router.get('/', urlController.url_index_get);
router.post('/', urlController.url_index_post);
router.get('/:short', urlController.url_redirect);
router.delete('/delete/:short', urlController.url_delete);

// export my router instance
module.exports = router;
