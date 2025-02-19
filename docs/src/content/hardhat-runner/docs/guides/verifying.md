# Verifying your contracts

Once your contract is ready, the next step is to deploy it to a live network and verify its source code.

Verifying a contract means making its source code public, along with the compiler settings you used, which allows anyone to compile it and compare the generated bytecode with the one that is deployed on-chain. Doing this is extremely important in an open platform like Ethereum.

In this guide we'll explain how to do this in the [Etherscan](https://etherscan.io/) explorer.

:::tip

If you wish to verify a contract deployed outside of Hardhat Ignition or if you'd like to verify on Sourcify instead of Etherscan, you can use the [hardhat-verify plugin](/hardhat-runner/plugins/nomicfoundation-hardhat-verify).

:::

## Getting an API key from Etherscan

The first thing you need is an API key from Etherscan. To get one, go to [their site](https://etherscan.io/login), sign in (or create an account if you don't have one) and open the "API Keys" tab. Then click the "Add" button and give a name (like "Hardhat") to the API key you are creating. After that you'll see the newly created key in the list.

Store the API key as the configuration variable `ETHERSCAN_API_KEY`:

```sh
$ npx hardhat vars set ETHERSCAN_API_KEY
✔ Enter value: ********************************
```

:::tip

Learn more about setting and using configuration variable in [our guide](/guides/configuration-variables).

:::

Open your Hardhat config and set the Etherscan API key as the stored configuration variable `ETHERSCAN_API_KEY`:

::::tabsgroup{options=TypeScript,JavaScript}

:::tab{value=TypeScript}

```ts
import { vars } from "hardhat/config";

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

export default {
  // ...rest of the config...
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
```

:::

:::tab{value=JavaScript}

```js
const { vars } = require("hardhat/config");

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

module.exports = {
  // ...rest of the config...
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};
```

:::

::::

## Deploying and verifying a contract in the Sepolia testnet

We are going to use the [Sepolia testnet](https://ethereum.org/en/developers/docs/networks/#sepolia) to deploy and verify our contract, so you need to add this network in your Hardhat config. Here we are using [Infura](https://infura.io/) to connect to the network, but you can use an alternative JSON-RPC URL like [Alchemy](https://alchemy.com/) if you want.

::::tabsgroup{options="Infura | Typescript,Alchemy | Typescript,Infura | Javascript,Alchemy | Javascript"}

:::tab{value="Infura | Typescript"}

```ts
// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and store it as the "INFURA_API_KEY"
// configuration variable
const INFURA_API_KEY = vars.get("INFURA_API_KEY");

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Store the private key as the "SEPOLIA_PRIVATE_KEY" configuration
// variable.
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

export default {
  // ...rest of your config...
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
```

:::

:::tab{value="Alchemy | Typescript"}

```ts
// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and store it as the "ALCHEMY_API_KEY"
// configuration variable
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Store the private key as the "SEPOLIA_PRIVATE_KEY" configuration
// variable.
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

export default {
  // ...rest of your config...
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
```

:::

:::tab{value="Infura | Javascript"}

```js
// Go to https://infura.io, sign up, create a new API key
// in its dashboard, and store it as the "INFURA_API_KEY"
// configuration variable
const INFURA_API_KEY = vars.get("INFURA_API_KEY");

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Store the private key as the "SEPOLIA_PRIVATE_KEY" configuration
// variable.
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

module.exports = {
  // ...rest of your config...
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
```

:::

:::tab{value="Alchemy | Javascript"}

```js
// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and store it as the "ALCHEMY_API_KEY"
// configuration variable
const ALCHEMY_API_KEY = vars.get("ALCHEMY_API_KEY");

// Replace this private key with your Sepolia account private key
// To export your private key from Coinbase Wallet, go to
// Settings > Developer Settings > Show private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Store the private key as the "SEPOLIA_PRIVATE_KEY" configuration
// variable.
// Beware: NEVER put real Ether into testing accounts
const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY");

const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY");

module.exports = {
  // ...rest of your config...
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};
```

:::

::::

To deploy on Sepolia you need to send some Sepolia ether to the address that's going to be making the deployment. You can get testnet ether from a faucet, a service that distributes testing-ETH for free. Here are some for Sepolia:

- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)
- [Ethereum Ecosystem Sepolia Faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)

Now you are ready to deploy your contract, but first we are going to make the source code of our contract unique. The reason we need to do this is that the sample code from the previous section is already verified in Sepolia, so if you try to verify it you'll get an error.

Open your contract and add a comment with something unique, like your GitHub's username. Keep in mind that whatever you include here will be, like the rest of the code, publicly available on Etherscan:

```solidity
// Author: @janedoe
contract Lock {
```

To run the deployment we will leverage the Ignition module `Lock` that we created in the [Deploying your contracts](./deploying.md) guide. Run the deployment using Hardhat Ignition and the newly added Sepolia network:

::::tabsgroup{options="TypeScript,JavaScript"}

:::tab{value="TypeScript"}

```shell
npx hardhat ignition deploy ignition/modules/Lock.ts --network sepolia --deployment-id sepolia-deployment
```

:::

:::tab{value="JavaScript"}

```shell
npx hardhat ignition deploy ignition/modules/Lock.js --network sepolia --deployment-id sepolia-deployment
```

:::

::::

:::tip

The `--deployment-id` flag is optional, but it allows you to give a custom name to your deployment. This makes it easier to refer to later, for instance when you want to verify it.

:::

Lastly, to verify the deployed contract, you can run the `ignition verify` task and pass the deployment Id:

```sh
npx hardhat ignition verify sepolia-deployment
```

Alternatively, you can combine deployment and verification into one step, by invoking the `deploy` task with the `--verify` flag:

::::tabsgroup{options="TypeScript,JavaScript"}

:::tab{value="TypeScript"}

```shell
npx hardhat ignition deploy ignition/modules/Lock.ts --network sepolia --verify
```

:::

:::tab{value="JavaScript"}

```shell
npx hardhat ignition deploy ignition/modules/Lock.js --network sepolia --verify
```

:::

::::

:::tip

If you get an error saying that the address does not have bytecode, it probably means that Etherscan has not indexed your contract yet. In that case, wait for a minute and then try again.

:::

After the `ignition verify` task is successfully executed, you'll see a link to the publicly verified code of your contract.
