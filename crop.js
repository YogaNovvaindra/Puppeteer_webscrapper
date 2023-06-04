const Jimp = require('jimp');

const imagePath = 'tes.png'; // Replace with your image path

// Define the crop dimensions
const x = 310; // X coordinate of the top-left corner of the crop area
const y = 59; // Y coordinate of the top-left corner of the crop area
const width = 750; // Width of the crop area
const height = 1080; // Height of the crop area

// Load the image
Jimp.read(imagePath, (err, image) => {
  if (err) {
    console.error(err);
    return;
  }

  // Crop the image
  image.crop(x, y, width, height);

  // Save the cropped image
  const outputPath = 'output.png'; // Replace with the desired output path
  image.write(outputPath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Image cropped successfully!');
  });
});