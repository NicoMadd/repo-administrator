const { logger } = require("../config/loggerConfig.js")
const git = require("nodegit")
const { rootdir, mainReposDir } = require("../config/config")
const {
	createFolderIfNotExists,
	deleteFolderIfExists,
} = require("../utils/utils")
const {
	deleteRepository,
	getRepoByName,
	initializeRepository,
	createRepository,
	getRepositories,
	deleteRepositoryById,
} = require("../utils/repositories.js")

createFolderIfNotExists(mainReposDir)

const cloneRepo = (req, res, next) => {
	try {
		const { repoUrl, repoName } = req.body
		const repodir = mainReposDir + repoName
		console.log(repodir)
		deleteFolderIfExists(repodir)
		createFolderIfNotExists(repodir)
		git.Clone(repoUrl, repodir)
			.then(() => res.status(200).send("pulled"))
			.catch((err) => {
				logger.error(err)
				res.status(500).send(err)
			})
	} catch (err) {
		logger.error(err)
	}
}

const createRepo = (req, res, next) => {
	try {
		//TODO get user
		const { name, type, url, description, dependencies, user } = req.body
		const id = createRepository({
			name,
			type,
			url,
			description,
			dependencies,
			owner: user,
		})
		res.send("created repo " + id)
	} catch (err) {
		logger.error(err)
	}
}

const deleteRepo = (req, res, next) => {
	try {
		const { id } = req.params
		deleteRepositoryById(id)
		res.status(200).send("deleted")
	} catch (err) {
		logger.error(err)
		res.status(500).send(err)
	}
}

const deleteAllRepos = (req, res, next) => {
	try {
		repositories.forEach((repo) => {
			deleteRepository(repo.name)
		})
	} catch (err) {
		logger.error(err)
		res.status(500).send(err)
	}
}

// const initializeRepo = (repo) => {
// 	try {
// 		switch (repo.type) {
// 			case "repository":
// 				return git.Clone(repo.url, mainReposDir + repo.name)
// 			case "combination":
// 				repo.dependencies.forEach((dependency) => {
// 					depRepo = getRepoById(dependency.id)
// 				})
// 		}
// 	} catch (err) {
// 		logger.error(err)
// 		throw err
// 	}
// }

const initializeRepo = (req, res, next) => {
	try {
		const { id } = req.params
		initializeRepository(id)
	} catch (err) {
		logger.error(err)
		throw err
	}
}

const initializeRepos = (req, res, next) => {
	console.log("initializeRepos")
	try {
		repositories.forEach((repo) => {
			repo.initialize(mainReposDir)
		})
	} catch (err) {
		logger.error(err)
	}
}

const listRepos = (req, res, next) => {
	try {
		res.send(JSON.stringify(getRepositories()))
	} catch (err) {
		logger.error(err)
	}
}

module.exports = {
	cloneRepo,
	createRepo,
	deleteRepo,
	deleteAllRepos,
	initializeRepos,
	initializeRepo,
	listRepos,
}
