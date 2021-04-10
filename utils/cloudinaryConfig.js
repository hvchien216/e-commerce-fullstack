const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_CLOUDINARY_KEY,
  api_secret: process.env.API_CLOUDINARY_SECRET
});
exports.uploads = (file, folder = 'ecommerce_web_app') => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        id: result.public_id
      })
    }, {
      resource_type: "auto",
      // upload_preset: 'social_network_dev',
      folder: folder
    })
  })
}