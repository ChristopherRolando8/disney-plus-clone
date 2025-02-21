const prioritizedPaths = {
	'/': true,
	'/search': true,
	'/watchlist': false,
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://disney-plus-clone.com',
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	sitemapSize: 5000,
	priority: 0.7,
	changefreq: 'daily',
	autoLastmod: true,
	exclude: ['*/404', '/server-sitemap.xml'],

	transform: async (config, path) => {
		return {
			loc: path,
			changefreq: config.changefreq,
			priority: prioritizedPaths[path] ? config.priority : 0.5,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
		};
	},

	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['*/404'],
			},
		],

		// ? I included server-side sitemaps
		additionalSitemaps: [
			`${process.env.NEXT_PUBLIC_SITE_URL}/server-sitemap.xml`,
		],
	},
};
