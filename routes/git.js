const express = require("express")
const { logger } = require("../config/loggerConfig")
const router = express.Router()

const {
	listRepos,
	deleteRepo,
	createRepo,
	deleteAllRepos,
	initializeRepos,
	initializeRepo,
} = require("../controllers/git")

router.route("/list").get(listRepos)
router.route("/create").post(createRepo)
router.route("/delete/:id").get(deleteRepo)
router.route("/delete/all").get(deleteAllRepos)
router.route("/initialize").get(initializeRepos)
router.route("/initialize/:id").get(initializeRepo)

module.exports = { router }
