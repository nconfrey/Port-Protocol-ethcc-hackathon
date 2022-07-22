# Port Protocol: Eth CC hackathon 2022

### Working with Alchemy
Unfortunately, the NFT minter didn't compile out of the gate. So, the steps to fix were:

1. follow this guide: https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5
2. `npm audit fix`
3. add to the config overrides `"path": require.resolve("path-browserify")`
4. `npm install path-browserify`
5. 