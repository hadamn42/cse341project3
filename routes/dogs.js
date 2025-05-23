const router = require('express').Router();
const { breedRules, validate } = require('../validation/validate.js');

const dogController = require('../controllers/dogs');

router.get('/', dogController.getAll);

router.get('/:id', dogController.getSingle);

router.post('/', breedRules(), validate, dogController.createDog);

router.put('/:id', breedRules(), validate, dogController.updateDog);

router.delete('/:id', dogController.deleteDog);

module.exports = router;