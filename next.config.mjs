/* eslint-disable import/no-anonymous-default-export */

export default {
  experimental: {
    esmExternals: true,
    missingSuspenseWithCSRBailout: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "valorpublicbucket.s3.amazonaws.com",
      },
    ],
  },
};
