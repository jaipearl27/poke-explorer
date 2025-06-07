const nextConfig = {
    images: {
        remotePatterns: [new URL('https://raw.githubusercontent.com/**'), new URL('http://raw.githubusercontent.com/**')],
    },
};

export default nextConfig;
