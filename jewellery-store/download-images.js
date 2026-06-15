const fs = require('fs');
const path = require('path');
const http = require('https');
const crypto = require('crypto');

let sharp;
try {
    sharp = require('sharp');
    console.log("Sharp loaded successfully. Images will be optimized and converted to WebP.");
} catch (err) {
    console.warn("Sharp could not be loaded. Downloader will fall back to direct byte saving.");
}

const IMAGES_DIR = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Function to download a URL to a buffer
function downloadToBuffer(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
                return;
            }
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
            res.on('error', (err) => reject(err));
        }).on('error', (err) => reject(err));
    });
}

// Main downloader function
async function main() {
    const htmlFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.html'));
    const filesToScan = [
        ...htmlFiles,
        path.join('js', 'main.js')
    ];
    console.log(`Scanning files: ${filesToScan.join(', ')}`);

    const remoteUrlRegex = /https:\/\/lh3\.googleusercontent\.com\/aida-public\/[a-zA-Z0-9_\-]+/g;
    const urlMap = new Map(); // remoteUrl -> localPath

    // Gather all unique remote URLs
    for (const file of filesToScan) {
        if (!fs.existsSync(file)) continue;
        const content = fs.readFileSync(file, 'utf8');
        const matches = content.match(remoteUrlRegex);
        if (matches) {
            matches.forEach(url => {
                if (!urlMap.has(url)) {
                    // Create a unique hash for the URL to avoid collision
                    const hash = crypto.createHash('md5').update(url).digest('hex');
                    const filename = `aurelia_img_${hash.slice(0, 12)}.webp`;
                    urlMap.set(url, {
                        filename,
                        localPath: path.join('assets', 'images', filename),
                        absolutePath: path.join(IMAGES_DIR, filename)
                    });
                }
            });
        }
    }

    console.log(`Found ${urlMap.size} unique remote images.`);

    // Download and convert each image
    for (const [url, info] of urlMap.entries()) {
        if (fs.existsSync(info.absolutePath)) {
            console.log(`Skipping already existing local image: ${info.filename}`);
            continue;
        }

        console.log(`Downloading: ${url} ...`);
        try {
            const buffer = await downloadToBuffer(url);
            
            if (sharp) {
                // Convert to WebP using Sharp
                await sharp(buffer)
                    .webp({ quality: 85 })
                    .toFile(info.absolutePath);
                console.log(`Successfully converted and saved as WebP: ${info.filename}`);
            } else {
                // Direct fallback - save as is
                fs.writeFileSync(info.absolutePath, buffer);
                console.log(`Saved bytes directly (fallback): ${info.filename}`);
            }
        } catch (err) {
            console.error(`Error processing image ${url}: ${err.message}`);
        }
    }

    // Now, replace remote URLs in all files with local paths
    console.log("Replacing remote URLs with local paths...");
    for (const file of filesToScan) {
        if (!fs.existsSync(file)) continue;
        let content = fs.readFileSync(file, 'utf8');
        let replacedCount = 0;

        for (const [url, info] of urlMap.entries()) {
            // Check if file contains url
            if (content.includes(url)) {
                // Replace URL with local path (ensure forward slashes for URLs)
                const relativeUrl = `assets/images/${info.filename}`;
                content = content.split(url).join(relativeUrl);
                replacedCount++;
            }
        }

        if (replacedCount > 0) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated ${replacedCount} references in ${file}`);
        }
    }

    console.log("Image localization complete.");
}

main().catch(err => {
    console.error("Downloader script failed:", err);
});
