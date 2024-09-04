const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Define your routes here
const routes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/dashboard', changefreq: 'daily', priority: 0.8 },
    { url: '/edit-profile', changefreq: 'monthly', priority: 0.6 },
    { url: '/add-preferences', changefreq: 'monthly', priority: 0.6 },
    { url: '/ignored-users', changefreq: 'monthly', priority: 0.6 },
    { url: '/shortlisted', changefreq: 'monthly', priority: 0.6 },
    { url: '/settings', changefreq: 'monthly', priority: 0.6 },
    { url: '/user-details', changefreq: 'weekly', priority: 0.7 },
    { url: '/home', changefreq: 'daily', priority: 0.9 },
    { url: '/login', changefreq: 'daily', priority: 0.9 },
    { url: '/forget', changefreq: 'monthly', priority: 0.6 },
    { url: '/signUp', changefreq: 'monthly', priority: 0.7 },
    { url: '/admin', changefreq: 'weekly', priority: 0.7 },
    { url: '/vendor', changefreq: 'weekly', priority: 0.7 },
    { url: '/admin-signup', changefreq: 'monthly', priority: 0.7 },
];

async function generateSitemap() {
    const sitemapStream = new SitemapStream({ hostname: 'https://pellisambandalu.com' });

    routes.forEach(route => {
        sitemapStream.write(route);
    });

    sitemapStream.end();

    const sitemap = await streamToPromise(sitemapStream);
    const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

    createWriteStream(sitemapPath).write(sitemap);
}

generateSitemap().catch(console.error);