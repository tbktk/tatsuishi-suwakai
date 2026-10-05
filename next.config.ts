import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repoName = "tatsuishi-suwakai";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  allowedDevOrigins: ["192.168.10.133"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
