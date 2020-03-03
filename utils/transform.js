

const userDefaultPrint = (doc, ret, options) => {
    delete ret.password
    delete ret.sid
    delete ret.phone
    delete ret.__v
    delete ret.name
    delete ret.followers

    return ret
}

const postDefaultPrint = (doc, ret, options) => {
    delete ret.likesUsers
    delete ret.dislikesUsers
    delete ret.__v
    ret.creationDate = ret.creationDate.toLocaleString()

    return ret
}
module.exports = {userDefaultPrint, postDefaultPrint}