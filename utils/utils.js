const fs = require("fs")

const encode = (str) => new TextEncoder().encode(str)

const decode = (buf) => new TextDecoder().decode(buf)

const createFolderIfNotExists = (folder) => {
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder)
	}
}

const deleteFolderIfExists = (folder) => {
	if (fs.existsSync(folder)) {
		fs.rmdirSync(folder, { recursive: true })
	}
}

module.exports = {
	encode,
	decode,
	createFolderIfNotExists,
	deleteFolderIfExists,
}
