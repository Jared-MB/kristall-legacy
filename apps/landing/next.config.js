/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/solutions",
				destination: "/solutions/inventory",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
