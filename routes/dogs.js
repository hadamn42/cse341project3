const router = require('express').Router();
const { breedRules, validate } = require('../validation/validate.js');
const { authCheck } = require('../authentication/authenticate.js');

const dogController = require('../controllers/dogs');

router.get('/', dogController.getAll);

router.get('/:id', dogController.getSingle);

router.post('/', breedRules(), validate, authCheck, dogController.createDog);

router.put('/:id', breedRules(), validate, authCheck, dogController.updateDog);

router.delete('/:id', authCheck, dogController.deleteDog);

module.exports = router;