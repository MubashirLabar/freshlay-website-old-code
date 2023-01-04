const User = require('../models/usermodel')

module.exports = async (id,right,type) => {
    const user = await User.findById(id);
    //console.log(user)
    //console.log(right)
    //console.log(user.rights)
    const access = user.rights[`${right}`][`${type}`]
    //console.log(access)
    return access
}