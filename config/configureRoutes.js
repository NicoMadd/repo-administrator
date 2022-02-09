// const { router: authRoutes } = require("../routes/auth.js")
// const { router: algorandRoutes } = require("../routes/algorand.js")
const { router: gitRoutes } = require("../routes/git.js")

const middlewares = require("../utils/middlewares")

const configureRoutes = (app) => {
	// get authorization token
	// app.use("/api/auth", authRoutes);

	app.use("/git", gitRoutes)

	//errorhandlers
	app.use(middlewares.error404Handler)
	app.use(middlewares.errorsHandler)

	return app
}

module.exports = { configureRoutes }
