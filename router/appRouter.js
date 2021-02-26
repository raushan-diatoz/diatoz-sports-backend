module.exports = function (app) {
    const { createTeam,getTeamPlayers,hitScore,getDashboard } = require('../controler/teamController');
    // app.route('create/team')
    //     .post(team.createTeam);

    app.post('/create/team', createTeam);
    app.get('/team/player',getTeamPlayers)
    app.put('/update/score',hitScore);
    app.get('/dashboard',getDashboard);

    app.get('/', function (req, res) {
        return res.send({ error: false, message: 'hello Mohit Default Page ' })
    });

    app.use((req, res, next) => {
        const error = new Error("Not Found");
        error.status = 404;
        next(error);
    })

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        })
    })
}