/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.kristall.app",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
