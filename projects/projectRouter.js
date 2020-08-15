const express = require("express")
const projects = require("../data/helpers/projectModel")


const router = express.Router();

router.get('/projects', (req, res) => {
    projects.get()
    .then()
    .catch()
})

module.exports = router;