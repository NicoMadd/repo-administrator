const git = require("nodegit")

class Repository {
	constructor({
		id,
		name,
		type,
		description,
		url,
		owner,
		dependencies,
		last_updated,
		last_updated_by,
	}) {
		this.id = id
		this.name = name
		this.type = type
		this.description = description
		this.url = url
		this.owner = owner
		this.dependencies = dependencies
		this.last_updated = last_updated
		this.last_updated_by = last_updated_by
	}

	initialize(mainReposDir) {
		throw new Error("Method not implemented.")
	}
}

class SimpleRepository extends Repository {
	constructor({
		id,
		name,
		type,
		description,
		url,
		owner,
		dependencies,
		last_updated,
		last_updated_by,
	}) {
		super({
			id,
			name,
			type,
			description,
			url,
			owner,
			dependencies,
			last_updated,
			last_updated_by,
		})
	}

	initialize(mainReposDir) {
		return git.Clone(this.url, mainReposDir + this.name)
	}
}

const parseRepository = (repo) => {
	switch (repo.type) {
		case "repository":
			return new SimpleRepository(repo)
		default:
			throw new Error("Invalid repository type")
	}
}

module.exports = { SimpleRepository, Repository, parseRepository }
