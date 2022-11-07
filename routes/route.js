const express = require('express');
const getAllGensList = require('../controllers/gen_list.js');
const getAllTalents = require('../controllers/all_talents.js');
const getTalent = require('../controllers/single_talent.js');

const router = express.Router();

router.get('/list', getAllGensList);
router.get('/talents', getAllTalents);
router.get('/talents/:name', getTalent);

module.exports = router;
