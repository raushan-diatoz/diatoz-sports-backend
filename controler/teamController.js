const teamSchema = require('../model/teamModel');

const createTeam = async (req, res) => {
    try {

        let tempTeam = {
            teamName: req.body.teamName,
            playerHitter: []
        }
        const newTeam = new teamSchema({
            team: tempTeam,
            isReady: true,
            captain: req.body.playerName[0],
            score: 0,
            playerName: req.body.playerName
        })
        const result = await newTeam.save();
        if (!result) {
            throw new Error(' not able to  store  data  ')
        }
        res.status(200).json({
            isReady: result.isReady
        })


    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const getTeamPlayers = async (req, res) => {
    try {

        const players = await teamSchema.find({
            'team.teamName': req.body.teamName
        })
        res.status(200).json(players)

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const hitScore = async (req, res) => {
    try {
        const updateScore = await teamSchema.findOneAndUpdate({
            "team.teamName": req.body.teamName
        }, {
            $set: {
                score: req.body.score,
                $push: {
                    playerHitter: req.body.playerName
                }
            }
        })
        if(!updateScore){
            throw new Error(' Not able to  update ')
        }
        res.status(200).json({
            message:"Score Updated"
        })
    } catch (error) {

    }
}

const getDashboard = async(req,res)=>{

    try {

        const players = await teamSchema.find()
        res.status(200).json(players)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createTeam,
    getTeamPlayers,
    hitScore,
    getDashboard
}