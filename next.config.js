/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,

	images: {
		// ? This ensures that only images from the official TMDB website can be optimized.
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
				pathname: '/**',
			},
		],
	},
};

module.exports = nextConfig;
