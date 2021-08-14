const multer = require("multer");
const path = require('path');

const storageImage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "file-storage/public/images");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname+"-"+Date.now()+path.extname(file.originalname)}`);
  },
});

const storageAvatar = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "file-storage/public/avatar");
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname+"-"+Date.now()+path.extname(file.originalname)}`);
  },
});
const uploadImage = multer({ storage:storageImage }).single("image");
const uploadAvatar = multer({storage:storageAvatar}).single("avatar");

const uploadImageForNews = (req, res) => {
  uploadImage(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error(err);
      res.status(500).json(err);
    } else if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      res.status(200).json({file : req.file});
    }
  });
};
const uploadAvatarForUser = (req,res) =>{
  uploadAvatar(req,res,(err)=>{
    if (err instanceof multer.MulterError){
      console.error(err);
      res.status(500).json({message:"MULTER_ERRROR", detail:err});
    } else if (err) {
      console.error(err);
      res.status(500).json({message:'SERVER_ERROR', detail:err});
    } else {
      res.status(200).json({file:req.file})
    }
  })
}

module.exports = { uploadImageForNews, uploadAvatarForUser };
