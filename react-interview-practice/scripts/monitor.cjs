const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const WATCH_DIR = path.join(__dirname, '../src/challenges');
const LOG_DIR = path.join(__dirname, '../challenge_logs');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR);
}

console.log(`Starting polling monitor for: ${WATCH_DIR}`);

// Store last modified times
const fileStates = new Map();

// Initialize states
try {
    const files = fs.readdirSync(WATCH_DIR);
    files.forEach(file => {
        const filePath = path.join(WATCH_DIR, file);
        const stats = fs.statSync(filePath);
        fileStates.set(file, stats.mtimeMs);
    });
} catch (err) {
    console.error('Error reading directory:', err);
}

// Polling function
setInterval(() => {
    fs.readdir(WATCH_DIR, (err, files) => {
        if (err) {
            console.error('Error polling directory:', err);
            return;
        }

        files.forEach(filename => {
            // Skip non-source files if needed
            if (!filename.match(/\.(js|jsx|ts|tsx)$/)) return;

            const filePath = path.join(WATCH_DIR, filename);
            
            fs.stat(filePath, (err, stats) => {
                if (err) return;

                const lastMtime = fileStates.get(filename);
                const currentMtime = stats.mtimeMs;

                if (!lastMtime || currentMtime > lastMtime) {
                    // File changed or is new
                    fileStates.set(filename, currentMtime);
                    
                    // If it's a new file found during polling (not initial load), or an update
                    if (lastMtime) { 
                        handleFileChange(filename, filePath);
                    }
                }
            });
        });
    });
}, 2000); // Poll every 2 seconds

function handleFileChange(filename, filePath) {
    console.log(`File changed: ${filename}`);

    // Run Linter
    exec(`npx eslint "${filePath}"`, (error, stdout, stderr) => {
        const timestamp = new Date().toLocaleString();
        const logFile = path.join(LOG_DIR, `${filename}.md`);
        
        let logContent = `\n## [${timestamp}] Update\n`;
        
        if (error) {
            // Lint errors found (or command failed)
            // Clean up stdout to just show the errors
            logContent += `### ⚠️ Lint Issues Found\n\`\`\`\n${stdout.trim()}\n\`\`\`\n`;
        } else {
            logContent += `### ✅ Lint Passed\n`;
        }

        // Future AI integration
        // const aiFeedback = await getAIFeedback(...)

        fs.appendFile(logFile, logContent, (err) => {
            if (err) console.error('Error writing to log:', err);
            else console.log(`Updated log for ${filename}`);
        });
    });
}
