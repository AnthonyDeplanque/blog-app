const multer = require("multer");

const {storageImage, storageAvatar} =require('../services/multerStorage');

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
