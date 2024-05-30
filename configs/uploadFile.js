const multer = require('multer');
const appRootPath = require('app-root-path');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        if (file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG|webp|WEBP|gif|GIF|tiff|TIFF|pdf|PDF)$/)) {
            cb(null, appRootPath + '/public/images/');
        } else if (file.originalname.match(/\.(flv|FLV|mp4|MP4|3gp|3GP|mov|MOV|avi|AVI|wmv|WMV|ts|TS)$/)) {
            cb(null, appRootPath + '/public/videos/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG|webp|WEBP|gif|GIF|tiff|TIFF|pdf|PDF|flv|FLV|mp4|MP4|3gp|3GP|mov|MOV|avi|AVI|wmv|WMV|ts|TS)$/)) {
        return cb(new Error('Loi roi'));
    }
    cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;