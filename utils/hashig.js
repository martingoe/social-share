const crypto = require("crypto")


const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = 64



const hashFunc = function (string){
    const hash = crypto.createHash("sha256")
    return hash.update(string + createPepper(), "utf8").digest()
}

const checkPassword = function (password, hashPassword){
    for (let i = 0; i < charactersLength; i++){
        const hash = crypto.createHash("sha256")
        const pepperPassword = password + characters.charAt(i)
        const hashPass = hash.update(pepperPassword, "utf8").digest()
        if(hashPass == hashPassword) return true
    }
    return false
}

function createPepper() {
   return characters.charAt(Math.floor(Math.random() * charactersLength));
}

module.exports = {hashFunc, checkPassword}