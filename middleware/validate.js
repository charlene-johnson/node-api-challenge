const projects = require("../data/helpers/projectModel")

module.exports = {validateProjectId};

function validateProjectId() {
    return (req, res, next) => {
        projects.get(req.body.project_id)
        .then(project => {
            if (project) {
                req.project = project
                next()
            } else {
                res.status(404).json({errorMessage: "Project not found"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({errorMessage: "There appears to be an issue updating the project",})
        })
    }
}