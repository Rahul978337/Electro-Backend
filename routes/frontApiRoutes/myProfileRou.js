const express = require("express");
const router = express.Router();
const {userUploads}=require('../../middleware/imageUploads')


const  profile  = require("../../controller/frontApi/myProfile");


router.get("/api/myProfile", profile.myProfile);
router.post(
  "/api/update-user/:id",
  userUploads.single("image"),
  profile.editUser
);

module.exports = router;