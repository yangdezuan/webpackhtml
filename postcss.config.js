module.exports = {
	plugins: [
		require('autoprefixer')({
			'browsers': ["last 2 version", "> 0.1%", "> 5% in US", "ie 6-8","Firefox < 20"]
		})
	]
}