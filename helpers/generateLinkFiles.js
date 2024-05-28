require('dotenv').config();

const generateLinkFiles = (data) => {
  if(data.length) {
    const resourceFiles = data.map(file => {
      if(file.filename.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG|webp|WEBP|gif|GIF|tiff|TIFF|pdf|PDF)$/)) {
        return `http://${process.env.HOST_DB}:${process.env.PORT_SERVER}/images/${file.filename}`;
      } else if(file.filename.match(/\.(flv|FLV|mp4|MP4|3gp|3GP|mov|MOV|avi|AVI|wmv|WMV|ts|TS)$/)) {
        return `http://${process.env.HOST_DB}:${process.env.PORT_SERVER}/videos/${file.filename}`;
      }
      return '';
    });
    return JSON.stringify(resourceFiles);
  } else {
    if(data.filename.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG|webp|WEBP|gif|GIF|tiff|TIFF|pdf|PDF)$/)) {
      return `http://${process.env.HOST_DB}:${process.env.PORT_SERVER}/images/${data.filename}`;
    } else if(data.filename.match(/\.(flv|FLV|mp4|MP4|3gp|3GP|mov|MOV|avi|AVI|wmv|WMV|ts|TS)$/)) {
      return `http://${process.env.HOST_DB}:${process.env.PORT_SERVER}/videos/${data.filename}`;
    }
    return '';
  }
}

module.exports = generateLinkFiles;