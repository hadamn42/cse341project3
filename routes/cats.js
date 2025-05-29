const router = require('express').Router();
const { catRules, validate } = require('../validation/validate.js');

const catController = require('../controllers/cats');

router.get('/', catController.getAll);

router.get('/:id', catController.getSingle);

router.post('/', catRules(), validate, catController.createCat);

router.put('/:id', catRules(), validate, catController.updateCat);

router.delete('/:id', catController.deleteCat);

module.exports = router;