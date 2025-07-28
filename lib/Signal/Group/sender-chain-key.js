"use strict"

Object.defineProperty(exports, "__esModule", { value: true })

const crypto_1 = require("@itsukichan/libsignal-node/src/crypto")
const sender_message_key_1 = require("./sender-message-key")

class SenderChainKey {
    constructor(iteration, chainKey) {
        this.MESSAGE_KEY_SEED = Buffer.from([0x01])
        this.CHAIN_KEY_SEED = Buffer.from([0x02])
        this.iteration = iteration
        if (chainKey instanceof Buffer) {
            this.chainKey = chainKey
        }
        else {
            this.chainKey = Buffer.from(chainKey || [])
        }
    }
    getIteration() {
        return this.iteration
    }
    getSenderMessageKey() {
        return new sender_message_key_1.SenderMessageKey(this.iteration, this.getDerivative(this.MESSAGE_KEY_SEED, this.chainKey))
    }
    getNext() {
        return new SenderChainKey(this.iteration + 1, this.getDerivative(this.CHAIN_KEY_SEED, this.chainKey))
    }
    getSeed() {
        return this.chainKey
    }
    getDerivative(seed, key) {
        return (0, crypto_1.calculateMAC)(key, seed)
    }
}

module.exports = {
  SenderChainKey
}