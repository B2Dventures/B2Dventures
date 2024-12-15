/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',   // Protocol (https in this case)
                hostname: 'utfs.io', // Hostname of the image source
                port: '',            // Leave blank if the source doesn't specify a port
                pathname: '/**',     // Match all paths under this domain
            },
        ],
    },
    // Apply headers to all routes
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=63072000; includeSubDomains; preload", // Enforce HTTPS
                    },
                    {
                        key: "Content-Security-Policy",
                        value:  `
                                img-src 'self' https://utfs.io https://img.clerk.com/;
                                connect-src 'self' https://endless-dory-50.clerk.accounts.dev/ https://apparent-bass-solely.ngrok-free.app;
                                worker-src 'self' blob:;
                                report-uri /api/csp-violation-report-endpoint/;
                              `.replace(/\s{2,}/g, " "), // Minify the CSP value
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff", // Prevent MIME type sniffing
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY", // Prevent clickjacking
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block", // Prevent cross-site scripting attacks
                    },
                    {
                        key: "Permissions-Policy",
                        value: "geolocation=(), microphone=(), camera=()", // Disable certain browser features
                    },
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "https://localhost:3000", // Enable CORS (Modify to restrict origins in production)
                    },
                ],
            }
        ]}
};

export default nextConfig;
