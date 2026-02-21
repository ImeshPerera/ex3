const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer-middleware");
const auth = require("../middlewares/auth-middleware");

const { saveCustomer, getCustomer, updateCustomer, deleteCustomer, getAllcustomers } = require('../controllers/customer-controller');

router.post("/",auth, upload.single("profile_image"), saveCustomer);
router.get("/:id",auth, getCustomer);
router.put("/:id",auth, upload.single("profile_image"), updateCustomer);
router.delete("/:id",auth, deleteCustomer);
router.get("/",auth, getAllcustomers);

module.exports = router;