const fs = require('fs');
const path = require('path');

// Paths
const periodicTablePath = path.join(__dirname, '../src/data/periodicTableData.ts');
const refiningPath = path.join(__dirname, '../Refining Molecule Synergy Document Structure.md');
const enhancePath = path.join(__dirname, '../Enhance Longevity Molecule Data.md');

// Read files
let periodicTableContent = fs.readFileSync(periodicTablePath, 'utf8');
const refiningContent = fs.readFileSync(refiningPath, 'utf8');
const enhanceContent = fs.readFileSync(enhancePath, 'utf8');

// --- Helper Functions ---

// Clean text: remove ".1 ", replace ".N" with "<sup>N</sup>"
function cleanText(text) {
    if (!text) return "";

    // 1. Remove the specific "Sheet1" citation, which appears as ".1" or " 1" at end of sentences.
    // Regex: Match period or comma, optional space, "1", and NO following digit.
    let cleaned = text.replace(/(\.|,)\s*1(?!\d)/g, '$1');

    // 2. Wrap other citations in <sup>. 
    // Match period/comma, optional space, capture digits, make sure not followed by digit.
    // We pass a callback to replace to allow checking if the number is "1" (though we just removed it, safety check).
    cleaned = cleaned.replace(/(\.|,)\s*(\d+)(?!\d)/g, (match, punct, num) => {
        if (num === '1') return match; // Should have been handled, but ignore if it persists
        return `${punct}<sup>${num}</sup>`;
    });

    // Also handle cases where citation is in parens or just space?
    // The user said "sentence.1 )". 
    // And "sentence.2" -> "sentence.<sup>2</sup>"

    return cleaned;
}

// Parse Bibliography
const bibliography = {};
// Format in file: "263. Title - Source, accessed Date, [url](url)"
const lines = enhanceContent.split('\n');
lines.forEach(line => {
    const m = line.trim().match(/^(\d+)\.\s+(.+)$/);
    if (m) {
        let rawText = m[2];
        const id = m[1];

        // Filter out Sheet1.csv
        if (rawText.includes("Periodic table of Longevity Molecules Data") || rawText.includes("Sheet1.csv")) {
            return;
        }

        // Extract URL: [url](url) or just (url) at the end.
        // Usually: [https://...](https://...)
        let url = "";
        const urlMatch = rawText.match(/\[(http.+?)\]/); // Markdown link text
        if (urlMatch) {
            url = urlMatch[1];
        } else {
            // Check for parens
            const parenMatch = rawText.match(/\((http.+?)\)/);
            if (parenMatch) url = parenMatch[1];
        }

        // Clean text
        // Remove "accessed December 10, 2025" and variants
        let cleanBibText = rawText.replace(/,\s*accessed\s+[a-zA-Z]+\s+\d+,\s+\d+/i, '');
        // Remove the markdown link part
        cleanBibText = cleanBibText.replace(/\[http.+?\]\(http.+?\)/, '');
        cleanBibText = cleanBibText.replace(/\(http.+?\)/, '');

        // Remove trailing commas/dash
        cleanBibText = cleanBibText.trim().replace(/,\s*$/, '').replace(/-\s*$/, '');

        bibliography[id] = { id, text: cleanBibText, url };
    }
});


// Data Storage
const moleculesData = {};

function getOrInit(num) {
    if (!moleculesData[num]) moleculesData[num] = {};
    return moleculesData[num];
}

// --- Parse Refining...md (Description, Partners, Mechanism, Impact) ---
const entryRegex = /### \*\*Entry (\d+): (.+?)\*\*/g;
let splitRefining = refiningContent.split(entryRegex);
for (let i = 1; i < splitRefining.length; i += 3) {
    const num = splitRefining[i];
    const content = splitRefining[i + 2];
    const entry = getOrInit(num);

    // Detailed Description
    const profileMatch = content.match(/Molecular Profile and Hallmark Analysis\s*([\s\S]*?)\n\*\*Synergistic Architecture\*\*/);
    if (profileMatch) {
        entry.detailedDescription = cleanText(profileMatch[1].trim().replace(/\n/g, ' '));
    }

    // Synergy Details
    const partnerMatch = content.match(/\* \*\*Partner:\*\* (.+)/);
    const mechMatch = content.match(/\* \*\*Mechanism:\*\* (.+)/);
    const impactMatch = content.match(/\* \*\*Impact:\*\* (.+)/);

    if (partnerMatch) {
        let partner = partnerMatch[1].trim().replace(/\.$/, '');
        entry.synergies = [partner]; // Keep simple list for backward compat / simple view

        if (mechMatch && impactMatch) {
            entry.synergyDetails = {
                partner: partner,
                mechanism: cleanText(mechMatch[1].trim()),
                impact: cleanText(impactMatch[1].trim())
            };
        }
    }
}

// --- Parse Enhance...md (Geek Mode) ---
let normalizedEnhance = enhanceContent.replace(/### \*\*(\d+)\\\. /g, '### **$1. ');
const splitEnhance = normalizedEnhance.split(/### \*\*(\d+)\. (.+?)\*\*/);

for (let i = 1; i < splitEnhance.length; i += 3) {
    const num = splitEnhance[i];
    const content = splitEnhance[i + 2];
    const entry = getOrInit(num);

    // Geek Mode Text
    const geekMatch = content.match(/Geek Mode:\s*([\s\S]*?)(?=###|$)/);
    if (geekMatch) {
        entry.geekModeText = cleanText(geekMatch[1].trim().replace(/\n\s*\n/g, '\n\n'));
    }
}

// --- Find Citations Helpers ---
function extractCitations(text) {
    const ids = new Set();
    if (!text) return [];
    // Looking for our new <sup>N</sup> tags mainly, but also raw numbers if we missed some
    const regex = /<sup>(\d+)<\/sup>/g;
    let m;
    while ((m = regex.exec(text)) !== null) {
        ids.add(m[1]);
    }
    return Array.from(ids).sort((a, b) => a - b);
}


// --- Update File ---
let newFileContent = periodicTableContent;

for (let i = 1; i <= 96; i++) {
    const entryData = moleculesData[i];
    if (!entryData) continue;

    const sourcesIds = new Set();
    if (entryData.detailedDescription) extractCitations(entryData.detailedDescription).forEach(id => sourcesIds.add(id));
    if (entryData.geekModeText) extractCitations(entryData.geekModeText).forEach(id => sourcesIds.add(id));

    // Resolve sources
    const resolvedSources = [];
    sourcesIds.forEach(id => {
        if (bibliography[id]) {
            resolvedSources.push(bibliography[id]);
        }
    });

    // Construct Injection Object
    // We are replacing the PREVIOUSLY injected fields.
    // The previous script appended fields. This one needs to be smarter or we just wipe and rewrite.
    // Strategy: We will identify the block for molecule `i` and strip out the old optional fields (lines starting with `detailedDescription:`, etc) and inject new ones.

    // 1. Find the object block
    const blockRegex = new RegExp(`(//\\s*${i}\\s*\\n\\s*\\{[\\s\\S]*?)(\\n\\s*\\},?)`);
    const match = newFileContent.match(blockRegex);

    if (match) {
        let body = match[1];
        const closing = match[2];

        // 2. Remove old fields from body
        // We look for lines with our keys and remove them.
        const lines = body.split('\n');
        const cleanLines = lines.filter(line => {
            const trim = line.trim();
            return !trim.startsWith('detailedDescription:') &&
                !trim.startsWith('synergies:') &&
                !trim.startsWith('synergyDetails:') &&
                !trim.startsWith('geekModeText:') &&
                !trim.startsWith('sources:');
        });

        // Rejoin body, ensure trailing comma on last property
        let newBody = cleanLines.join('\n');
        // Check if last line needs comma
        // (Not strictly necessary if we append new fields which start with newline, but good practice. 
        // Actually, we will just start our injection with \n)

        // 3. Create Injection String
        let injection = '';
        if (entryData.detailedDescription) {
            injection += `\n        detailedDescription: ${JSON.stringify(entryData.detailedDescription)},`;
        }
        if (entryData.synergies) {
            injection += `\n        synergies: ${JSON.stringify(entryData.synergies)},`;
        }
        if (entryData.synergyDetails) {
            injection += `\n        synergyDetails: ${JSON.stringify(entryData.synergyDetails)},`;
        }
        if (entryData.geekModeText) {
            injection += `\n        geekModeText: ${JSON.stringify(entryData.geekModeText)},`;
        }
        if (resolvedSources.length > 0) {
            injection += `\n        sources: ${JSON.stringify(resolvedSources)},`;
        }

        // 4. Replace in file
        newFileContent = newFileContent.replace(match[0], newBody + injection + closing);
    }
}

fs.writeFileSync(periodicTablePath, newFileContent);
console.log("Repopulated data in periodicTableData.ts");
