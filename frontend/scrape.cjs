const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Navigate to the target site
    await page.goto('https://namamigaiya.com/', { waitUntil: 'networkidle2' });

    // Extract all image sources
    const images = await page.evaluate(() => {
        const urls = [];
        document.querySelectorAll('img').forEach(img => {
            if (img.src) urls.push({ src: img.src, alt: img.alt || '' });
        });
        return urls;
    });

    console.log(JSON.stringify(images, null, 2));
    fs.writeFileSync('scraped-images.json', JSON.stringify(images, null, 2));

    await browser.close();
})();
