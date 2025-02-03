let openChapters = [];        // List of open chapters in ascending order
let chapterData = {};         // In-memory store of fetched HTML data
let currentCols = 0;          // Tracks current column count
let rowEnd = [];             // Array of row endpoints (ex: [10,20,28] for 10-col Matthew)

console.log("✅ dynamicRows.js loaded!");

// 1) On DOM load, figure out how many columns we have & build row end
document.addEventListener("DOMContentLoaded", () => {
    currentCols = getColumnCount();
    calculateRowEnd();
});

// 2) Recalc columns & re-position chapters on screen resize
window.addEventListener("resize", () => {
    let newCols = getColumnCount();
    if (newCols !== currentCols) {
        console.log(`🔄 Resizing from ${currentCols} to ${newCols} columns`);
        currentCols = newCols;
        calculateRowEnd();
        positionAllChapters(); // Re-insert everything in correct order
    }
});

/** Returns how many columns are currently used (3,4,6,10, etc.) */
function getColumnCount() {
    let chapterGrid = document.getElementById("chapter-grid");
    return getComputedStyle(chapterGrid).gridTemplateColumns.split(" ").length;
}

/** Rebuild rowEnd array based on total chapters + column count */
function calculateRowEnd() {
    rowEnd = [];
    const totalChapters = document.querySelectorAll("[id^='chapter-btn-']").length;

    for (let i = currentCols; i <= totalChapters; i += currentCols) {
        rowEnd.push(i);
    }
    // If last row isn't a clean multiple, add final chapter
    if (rowEnd[rowEnd.length - 1] !== totalChapters) {
        rowEnd.push(totalChapters);
    }
    console.log(`📊 Row End for ${currentCols} columns:`, rowEnd);
}

/**
 * Main function: toggles a chapter on/off.
 *  - If already open, remove.
 *  - If not open, fetch content, store in chapterData, open it.
 */
function toggleChapter(chapter) {
    let existingContent = document.getElementById(`chapter-content-${chapter}`);
    if (existingContent) {
        // Chapter is open -> close it
        existingContent.remove();
        openChapters = openChapters.filter(ch => ch !== chapter);
        positionAllChapters();
        updateCollapseButton();
        return;
    }

    console.log(`📖 Attempting to load Chapter ${chapter}`);

    // If we already have fetched data for this chapter, skip fetch
    if (chapterData[chapter]) {
        console.log(`🔎 Using cached data for Chapter ${chapter}`);
        openChapters.push(chapter);
        openChapters.sort((a, b) => a - b);
        positionAllChapters();
        updateCollapseButton();
        return;
    }

    // Otherwise fetch the HTML
    fetch(`./${chapter}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Chapter ${chapter} not found.`);
            }
            return response.text();
        })
        .then(data => {
            console.log(`✅ Successfully fetched Chapter ${chapter}`);
            // Store in memory so we don't lose it
            chapterData[chapter] = data;

            openChapters.push(chapter);
            openChapters.sort((a, b) => a - b);
            console.log(openChapters);

            positionAllChapters();
            updateCollapseButton();
        })
        .catch(error => console.error("❌ Fetch Error:", error));
}

/**
 * Re-insert ALL open chapters in ascending order, ensuring correct row.
 * Removes any leftover DOM elements so we start fresh each time.
 */
function positionAllChapters() {
    // Remove all existing chapter content from DOM
    document.querySelectorAll("[id^='chapter-content-']").forEach(el => el.remove());

    // Sort openChapters descending
    openChapters.sort((a, b) => b - a);

    // Insert each chapter's content in correct row
    openChapters.forEach(chapter => {
        insertSingleChapter(chapter);
    });
}

/**
 * Insert a single chapter into the DOM in correct row, using rowEnd + chapterData
 */
function insertSingleChapter(chapter) {
    let chapterNum = parseInt(chapter, 10);
    let chapterGrid = document.getElementById("chapter-grid");

    // Create DOM element for the chapter content if it doesn't exist
    let chapterContent = document.createElement("div");
    chapterContent.id = `chapter-content-${chapterNum}`;
    chapterContent.className = "bg-white p-6 rounded-lg shadow-lg col-span-full mt-4";
    chapterContent.innerHTML = chapterData[chapterNum] || `<p class="text-red-500">No data for Chapter ${chapterNum}</p>`;

    // Identify which row we belong to
    let rowIndex = rowEnd.findIndex(end => chapterNum <= end);
    let rowEndChapter = rowEnd[rowIndex];
    let rowEndButton = document.getElementById(`chapter-btn-${rowEndChapter}`);

    if (!rowEndButton) {
        // fallback: last button in entire grid
        let buttons = Array.from(chapterGrid.children);
        rowEndButton = buttons[buttons.length - 1];
    }
    console.log(`🔢 Chapter ${chapterNum} => row end: ${rowEndChapter}`);

    // Insert after rowEndButton
    rowEndButton.parentNode.insertBefore(chapterContent, rowEndButton.nextSibling);
}

/**
 * Collapses all open chapters
 */
function collapseAll() {
    openChapters.forEach(ch => {
        let content = document.getElementById(`chapter-content-${ch}`);
        if (content) content.remove();
    });
    openChapters = [];
    updateCollapseButton();
}

/**
 * Show/hide the Collapse All button
 */
function updateCollapseButton() {
    let collapseBtn = document.getElementById("collapse-button");
    collapseBtn.classList.toggle("hidden", openChapters.length < 2);
}