const express = require("express")
const actions = require("../data/helpers/actionModel")
const {validateProjectId, validateActionId} = require("../middleware/validate")

const router = express.Router();

// Get all actions
router.get("/", (req, res, next) => {
   return actions
    .get()
    .then((action) => {
        if(action) {
        res.status(200).json(action)
        } else {
            res.status(400).json({errorMessage: "Actions can't be found"})
        }
    })
    .catch(next)
})

// Get actions by ID
router.get("/:id", validateActionId(), (req, res, next) => {
    return actions.get(req.params.id)
    .then((action) => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(400).json({errorMessage: "There are no actions with this ID"})
        }
    })
    .catch(next)
})

//Create an action
router.post("/:id/actions", validateProjectId(), (req, res, next) => {
  if(!req.body) {
      return res.status(400).json({errorMessage: "Please provide description and notes"})
  }
  actions.insert({...req.body, project_id: req.params.id})
  .then((action) => {
      if (!action) {
          res.status(404).json({errorMessage: "This ID does not exist."})
      } else {
          res.status(201).json(action)
      }
  })
  .catch(next)
})

//Update an action
router.put("/:id", validateActionId(),(req, res,next) => {
    actions.update(req.params.id, req.body)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})

// Deletes an action
router.delete("/:id", validateActionId(), (req, res, next) => {
    actions.remove(req.params.id)
    .then((action) => {
        if(action) {
          res.status(204).json(action)  
        } else {
            res.status(400).json({errorMessage: "There are no actions with this ID."})
        }
        
    })
    .catch(next)
})

module.exports = router;