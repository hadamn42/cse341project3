const router = require('express').Router();
// const { breedRules, validate } = require('../validation/validate.js');

const catController = require('../controllers/cats');

router.get('/', catController.getAll);

router.get('/:id', catController.getSingle);

router.post('/', catController.createCat);

// router.put('/:id', breedRules(), validate, catController.updateCat);
router.put('/:id', catController.updateCat);

router.delete('/:id', catController.deleteCat);

module.exports = router;