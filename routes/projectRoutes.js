const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authToken = require('../middleware/authMiddleware');

router.get('/', authToken ,projectController.getAllProjects);
router.post('/', authToken ,projectController.createProject);

module.exports = router;