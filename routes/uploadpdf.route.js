const express = require('express');
const auth = require('../middleware/auth');
const perm = require('../middleware/perm');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

router.use(auth);
router.use(perm);

const storage = multer.diskStorage({
 	destination: function(req, file, cb) {
	    cb(null, './documents/');
    },
    filename: function(req, file, cb) {
	    cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
  }
};

const upload = multer({
  	    storage: storage,
  	    limits: {
    	    fileSize: 1024 * 1024 * 10
      },
        fileFilter: fileFilter
});

router.post('/', upload.array('document'), async (req,res) => {
	const files = await req.files;
	if (files.length == 0) return res.status(400).send('Please select only pdf extension.');
	res.send(files);
});

router.delete('/:id', async (req, res) => {
	const path = './documents/' + req.params.id;
	await fs.unlinkSync(path);
	res.send(path);
});

module.exports = router;
