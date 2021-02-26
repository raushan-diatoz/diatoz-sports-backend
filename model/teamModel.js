const mongoose = require('mongoose');

const teamDetail = {
    teamName:String,
    playerHitter:[]
}
const teamSchema = mongoose.Schema({
    team:teamDetail,
    captain:String,
    playerName:[],
    score:{
        type:Number,
        default:0
    },

    isReady:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('Teams',teamSchema)