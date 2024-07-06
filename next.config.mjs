/** @type {import('next').NextConfig} */
import withLess from 'next-less';

const nextConfig = withLess({
    lessOptions: {
        javascriptEnabled: true,
    },
    // 其他 Next.js 配置...
});

export default nextConfig;
