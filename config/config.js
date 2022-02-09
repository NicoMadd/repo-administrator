require("dotenv").config()

const PORT = process.env.PORT
const SECRET = process.env.SECRET
const rootdir = __dirname + "/../"
const mainReposDir = process.env.MainReposDirs || rootdir + "repos/"
const repositoryFileRoute =
	process.env.RepositoryFileRoute || mainReposDir + "repositories.json"

module.exports = {
	PORT,
	SECRET,
	mainReposDir,
	repositoryFileRoute,
	rootdir,
}
