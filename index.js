import { createCanvas } from "canvas";
import base64Img from "base64-img";
import fs from "fs";
import { create } from "ipfs-http-client";

(async function () {
  // Define an array of words to choose from
  const words = ["cat", "dog", "bird", "fish", "rabbit", "hamster"];

  // Define the number of words to use for each picture
  const numWords = 3;

  // Generate a random phrase
  function generatePhrase() {
    let phrase = "";
    for (let i = 0; i < numWords; i++) {
      // Randomly select a word from the array
      const index = Math.floor(Math.random() * words.length);
      const word = words[index];
      // Add the word to the phrase
      phrase += word + " ";
    }
    return phrase.trim(); // Remove trailing space
  }

  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext("2d");

  // Generate a random phrase
  const phrase = generatePhrase();

  // Draw the phrase on the canvas
  ctx.font = "48px Arial";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(phrase, canvas.width / 2, canvas.height / 2);

  // Convert the canvas to a data URL
  const dataURL = canvas.toDataURL();

  // Save the image to a file
  base64Img.img(dataURL, ".", "nft", function (err, filepath) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Image saved to ${filepath}`);
    }
  });

  const ipfs = create("/ip4/127.0.0.1/tcp/5001");

  // Upload the image to IPFS and get the CID
  const fileStream = fs.createReadStream("nft.png");
  const { cid } = await ipfs.add(fileStream);
  const cidString = cid.toString();

  console.log(`ipfs://${cidString}`);
})();
