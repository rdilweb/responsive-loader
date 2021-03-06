const sharp = require('sharp');

module.exports = (imagePath) => {
  const image = sharp(imagePath);

  return {
    metadata: () => image.metadata(),
    resize: ({width, mime, options}) =>
      new Promise((resolve, reject) => {
        let resized = image.clone()
          .resize(width, null);

        if (options.background) {
          resized = resized.flatten({background: options.background })
        }

        if (mime === 'image/jpeg') {
          resized = resized.jpeg({
            quality: options.quality
          });
        }

        resized.toBuffer((err, data, {height}) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              data,
              width,
              height
            });
          }
        });
      })
  };
};
