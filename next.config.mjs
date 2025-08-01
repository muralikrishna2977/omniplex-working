// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//       },
//     ],
//   },
//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production",
//   },
// };

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        'firebase/auth': 'firebase/auth', // make sure to resolve only browser module
      };
    }
    return config;
  },
};

export default nextConfig;
