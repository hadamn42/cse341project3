const router = require('express').Router();
const { catRules, validate } = require('../validation/validate.js');
const { authCheck } = require('../authentication/authenticate.js');

const catController = require('../controllers/cats');

router.get('/', catController.getAll);

router.get('/:id', catController.getSingle);

router.post('/', catRules(), validate, authCheck, catController.createCat);

router.put('/:id', catRules(), validate, authCheck, catController.updateCat);

router.delete('/:id', catController.deleteCat);

module.exports = router;