const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
   res.render('index', { title: 'My HTML Page' });
});

module.exports = router;