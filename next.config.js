/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'imgur.com',
			},
		],
	},
	webpack: (config) => {
		config.externals.push({
			'utf-8-validate': 'commonjs utf-8-validate',
			bufferutil: 'commonjs bufferutil',
			canvas: 'commonjs canvas',
		});
		// config.infrastructureLogging = { debug: /PackFileCache/ };
		return config;
	},
};

module.exports = nextConfig;
