const Router = require('express').Router;
const PharmacyController = require('../controllers');

const router = new Router();

router.get('/availability',PharmacyController.getAvailablePharmacies);
router.get('/search',PharmacyController.searchPharmacies);
router.get('/',PharmacyController.getPharmacies);

router.get('/:id',PharmacyController.patchePharmacy);
router.post('/',PharmacyController.createPharmacy);
router.patch('/:id',PharmacyController.patchePharmacy);

module.exports = router;