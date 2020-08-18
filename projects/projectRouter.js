const express = require("express")
const projects = require("../data/helpers/projectModel")
const {validateProjectId} = require("../middleware/validate")

const router = express.Router();

// Get all projects
router.get("/", (req, res, next) => {
    return projects
     .get()
     .then((project) => {
         if(project) {
         res.status(200).json(project)
         } else {
             res.status(400).json({errorMessage: "There was an error getting the projects"})
         }
     })
     .catch(next)
 })


// Get projects by ID
 router.get("/:id", validateProjectId(), (req, res, next) => {
     return projects.get(req.params.id)
     .then((project) => {
         if(project) {
             res.status(200).json(project)
         } else {
             res.status(400).json({errorMessage: "There are no projects with this ID"})
         }
     })
     .catch(next)
 })

// Get project actions
 router.get("/:id/actions", validateProjectId(), (req, res, next) => {
     return projects.getProjectActions(req.params.id)
     .then((project) => {
         res.status(200).json(project)
     })
     .catch(next)
 })

 // Create a project
router.post('/', validateProjectId(), (req, res, next) => {
   return projects.insert(req.body)
    .then((project) => {
        if(project) {
          res.status(201).json(project)  
        } else {
            res.status(400).json({errorMessage: "Need a name and description."})
        }
    })
    .catch(next)
})

// Update project
router.put("/:id", validateProjectId(),(req, res,next) => {
    projects.update(req.params.id, req.body)
    .then((project) => {
        res.status(200).json(project)
    })
    .catch(next)
})

// Delete a project
router.delete("/:id", validateProjectId(), (req, res, next) => {
    projects.remove(req.params.id)
    .then((project) => {
        if(project) {
            res.status(204).json(project)
        } else {
            res.status(400).json({
                errorMessage: "There are no projects with this ID."
            })
        }
    })
    .catch(next)
})

module.exports = router;