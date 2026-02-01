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
        hostname: "www.qebarnet.co.uk",
      },
      {
        protocol: "https",
        hostname: "www.st-michaels.barnet.sch.uk",
      },
      {
        protocol: "https",
        hostname: "www.hbschool.org.uk",
      },
      {
        protocol: "https",
        hostname: "www.beths.bexley.sch.uk",
      },
      {
        protocol: "https",
        hostname: "www.bexleygs.co.uk",
      },
      {
        protocol: "https",
        hostname: "www.csgrammar.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },

      // Add more hostnames as needed
    ],
  },
};
