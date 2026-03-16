// import withPWAInit from "next-pwa";

// const withPWA = withPWAInit({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });

// const nextConfig = {
//   reactStrictMode: true,
// };

// export default withPWA(nextConfig);

import withPWAInit from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const withPWA = withPWAInit({
  dest: "public",
  disable: isDev, // 🚀 Disable PWA in dev
});

const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
};

export default withPWA(nextConfig);