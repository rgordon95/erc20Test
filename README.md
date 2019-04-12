# Ethereum Exploration (ERC20 Tokens & Smart Contracts)
Exploring smart contracts and ERC20 tokens using Solidity, 
web3.js, 
Geth (go-eth),
truffle framework,
ganache GUI/CLI 
and classic ES6 JavaScript

This repo has a variety of example smart contracts, including extremely basic to moderately advanced deployable voting contracts, 
a hello world example and a multisig wallet transactor.

# basicExamples folder
    contains a classic helloWorld solidity file in solidity 0.4.x and basic multiSig wallet in 0.5.x

# tokenTests folder
    contains examples / basic files for creating an ERC20 Token with explanations

# web3Example2 folder
    contains Voter.sol voting contract written using solidity 0.5.x

# truffleFrameworkEx folder 
    Shows typical structure of a truffle framework project using Voter.sol example as well
    contains unit testing, truffle config, deployment logic, interaction logic 
    and the above mentioned voter contract

# truffleRefactor folder
    this folder uses the same code found in the voterDeployWeb3Ex folder but 
    slightly modified for running with truffle. 