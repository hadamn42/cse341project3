const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hellow World');
});

router.use('/dogs', require('./dogs'));

module.exports = router;