# Text NFT Generator

This is a simple tool to generate text NFTs. It uses canvas to generate the images and then uploads them to IPFS. The metadata is generated and uploaded to IPFS as well. Then the metadata cid must be passed to the Lazy Mint blockchain call to create a drop.

## How to use

1. Clone the repo
2. Run `npm install`
3. Deploy IPFS node locally or use Infura
4. Run `npm run start`

## How it works

1. After running `npm run start` the script will generate random text phrase.
2. Then it will create a canvas with the text phrase.
3. Save it to `{filePath}` folder with name _nft.png_.
4. Upload the image to IPFS, log image link as `ipfs://${cidString}`.
5. And the final step is to upload the image to IPFS and log the metadata link as `ipfs://${cidString}`.
