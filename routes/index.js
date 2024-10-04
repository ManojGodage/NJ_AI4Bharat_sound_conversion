const express = require('express');
const router = express.Router();
const multer = require("multer");
const config = require('../config/data/config.json');
const getUrlPrefix = config.app.prefix;

const { soundConversion } = require('../controller/getData');


router.get(getUrlPrefix + "/ping",(req, res)=>{
    // console.log("pong");
    res.status(200).send("pong");
})

let storage = multer.memoryStorage();
let upload = multer({
  storage: storage
});

router.post(getUrlPrefix + "/uploadExcel", upload.single('file') ,(req, res)=>{
  res.status(200).json({"status":"success","message":"soundfile converted successfully!"});
  soundConversion(req, res);
})


module.exports = router