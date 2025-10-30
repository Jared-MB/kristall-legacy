/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/dashboard/settings",
        destination: "/dashboard/settings/general",
        permanent: true,
      },
    ];
  },
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
  poweredByHeader: false,
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: ["@kristall/client"],
};

export default nextConfig;
