const { logger } = require("../config/loggerConfig")
const fs = require("fs")
const { mainReposDir, repositoryFileRoute } = require("../config/config")
const { deleteFolderIfExists } = require("./utils")
const { parseRepository } = require("../utils/Repository")
const { get } = require("express/lib/response")
var repositories = JSON.parse(fs.readFileSync(repositoryFileRoute, "utf8")).map(
	(e) => parseRepository(e)
)

const getRepositoriesFiles = () => {
	return fs.readdirSync(mainReposDir)
}

const getRepositories = () => {
	return repositories
}

const getRepoById = (id) => {
	return getRepositories().find((repo) => repo.id == id)
}

const getRepoByName = (name) => {
	return getRepositories().find((repo) => repo.name === name)
}

const repoExists = (id) => {
	return getRepoById(id) != undefined
}

const validateRepository = ({
	name,
	type,
	url,
	dependencies,
	description,
	by,
}) => {
	if (!name) {
		throw new Error("Missing name ")
	}
	dependencies.forEach((dependency) => {
		if (!validateRepository(dependency))
			throw new Error("Invalid dependency " + dependency)
	})
}

const createRepository = (
	{ name, type, url, dependencies, description, owner } = {
		type: "repository",
		url: "",
		dependencies: [],
		description: "",
		owner: "master",
	}
) => {
	try {
		validateRepository({
			name,
			type,
			url,
			dependencies,
			description,
			owner,
		})
		const repo = {
			id: repositories.length + 1,
			name,
			type,
			url,
			dependencies,
			description,
			last_updated: new Date().toISOString(),
			last_updated_by: owner,
			owner: owner,
		}

		repositories.push(repo)
		fs.writeFileSync(repositoryFileRoute, JSON.stringify(repositories))
		return repo.id
	} catch (err) {
		logger.error(err)
		throw err
	}
}

const deleteRepositoryById = (id) => {
	const repo = getRepoById(id)
	const repodir = mainReposDir + repo.name
	deleteFolderIfExists(repodir)
	repositories = repositories.filter((repo) => repo.id != id)
	fs.writeFileSync(
		mainReposDir + "repositories.json",
		JSON.stringify(getRepositories())
	)
}

const deleteRepository = (repo) => {
	deleteRepositoryById(repo.id)
}
const initializeRepository = (id) => {
	try {
		if (!repoExists(id)) throw new Error("Repository does not exist")

		const repo = getRepoById(id)
		repo.initialize(mainReposDir)
	} catch (err) {
		logger.error(err)
		throw err
	}
}

module.exports = {
	getRepositories,
	createRepository,
	deleteRepository,
	deleteRepositoryById,
	initializeRepository,
	getRepoById,
	getRepoByName,
}
