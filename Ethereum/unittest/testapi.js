var EthereumController = require('../controllers/ethereum');
var Web3 = require('web3');

// Show Web3 where it needs to look for a connection to Ethereum.
var config = require('../config/common').info;
var web3 = new Web3(new Web3.providers.HttpProvider(config.provider));


function getblockTest() {
    console.log("------------ test blocklist API -------------");

    var blocknum = 3174639;
    var count = 4;
    web3.eth.getBlockNumber(async  function(error, number) {
        if (!error) {
            try {
                console.log("last number " + number);
                var blocks = [];
                for (let i = blocknum; i <= number && i < blocknum + count; i ++) {
                    var blockdata = await web3.eth.getBlock(i, true);
console.log(blockdata);
                    
                    var Height = blockdata.number;
                    var Age = parseInt(Date.now() / 1000) - blockdata.timestamp;
                    var txn = blockdata.transactions.length;
                    var Uncles = blockdata.uncles.length;
                    var Miner = blockdata.miner;
                    var GasUsed = blockdata.gasUsed;
                    var GasLimit = blockdata.gasLimit;
                    
                    var Reward = 0;
		    var gas = 0;
                    for (let j = 0; j < txn; j ++) {
                        let price = blockdata.transactions[j].gasPrice * blockdata.transactions[j].gas;
			gas += blockdata.transactions[j].gas;
                        Reward += price / 1000000000;
                    }
console.log("used", GasUsed);
console.log("gas sum", gas);
                    var GasPrice = txn ? Reward / gas: 0;
                    Reward = Reward / 1000000000;

                    blocks.push({
                        Height: Height,
                        Age: Age,
                        txn: txn,
                        Uncles: Uncles,
                        Miner: Miner,
                        GasUsed: GasUsed,
                        GasLimit: GasLimit,
                        GasPrice: parseInt(GasPrice),
                        Reward: Reward.toFixed(2)
                    });
                }

                console.log("blocks: ", blocks);
            }
            catch(e) {
                console.log('blocklist: we have a promblem: ', e); // Should dump errors here
            }
        }
        else {
            console.log('getBlockNumber: we have a promblem: ', error); // Should dump errors here
        }
    });
}

getblockTest();