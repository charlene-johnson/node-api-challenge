const express = require("express")
const actions = require("../data/helpers/actionModel")
const {validateProjectId} = require("../middleware/validate")


const router = express.Router();

router.get("/", (req, res) => {
   return actions
    .get()
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({errorMessage: "Error retrieving actions"})
    })
})

router.post("/", validateProjectId(), (req, res) => {
    actions.insert(req.body)
    .then((action) => {
        res.status(200).json(action)
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({errorMessage: "Error adding actions"})
    })
})

router.put("/:id", (req, res) => {
    actions.update()
})

module.exports = router