

const userDefaultPrint = (doc, ret, options) => {
    delete ret.password
    delete ret.sid
    delete ret.phone
    delete ret.__v
    delete ret.name

    return ret
}

module.exports = {userDefaultPrint}