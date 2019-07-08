const auth = require('../middleware/auth');
const perm = require('../middleware/perm');
const PartnerController = require('../controllers/partner.controller');
const express = require('express');
const router = express.Router();

router.use(auth);
router.get('/', PartnerController.getAllPartners);
router.get('/:id', PartnerController.getPartnerById);
router.post('/', perm, PartnerController.createPartner);
router.put('/:id', perm, PartnerController.updatePartner);
router.delete('/:id', perm, PartnerController.deletePartner);

module.exports = router;