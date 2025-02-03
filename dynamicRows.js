let openChapters = [];
let currentCols = 0;
let rowEnd = [];

console.log("✅ dynamicRows.js is loaded!");

// 🌍 Detect window resize and recalculate rows
window.addEventListener("resize", updateRows);

// 📌 Get current column count
function getColumnCount() {
    let chapterGrid = document.getElementById("chapter-grid");
    return getComputedStyle(chapterGrid).gridTemplateColumns.split(" ").length;
}

// 🛠 Update row breakpoints based on screen size
function updateRows() {
    let newCols = getColumnCount();
    if (newCols !== currentCols) {
        currentCols = newCols;
        calculateRowEnd();
        positionChapters();
    }
}

// 🔢 Calculate row breaks
function calculateRowEnd() {
    rowEnd = [];
    let totalChapters = document.querySelectorAll("[id^='chapter-btn-']").length;

    // Standard row endings
    for (let i = currentCols; i <= totalChapters; i += currentCols) {
        rowEnd.push(i);
    }

    // Ensure the last chapter is included if it's not a clean multiple
    if (rowEnd[rowEnd.length - 1] !== totalChapters) {
        rowEnd.push(totalChapters);
    }

    console.log(`📊 Row Endpoints for ${currentCols} columns:`, rowEnd);
}

// 📌 Insert Chapter Content in the Correct Row
function positionChapters() {
    let chapterGrid = document.getElementById("chapter-grid");
    let buttons = Array.from(chapterGrid.children);

    let lastInserted = null;

    openChapters.forEach(chapter => {
        let chapterContent = document.getElementById(`chapter-content-${chapter}`);

        if (!chapterContent) {
            chapterContent = document.createElement("div");
            chapterContent.id = `chapter-content-${chapter}`;
            chapterContent.className = "bg-white p-6 rounded-lg shadow-lg col-span-full mt-4";

            // ✅ Inject fetched content into the div
            fetch(`./${chapter}.html`)
                .then(response => response.text())
                .then(data => {
                    console.log(`📝 Inserting content for Chapter ${chapter}`);
                    chapterContent.innerHTML = data;
                })
                .catch(error => console.error("❌ Fetch Error:", error));
        }

        let button = document.getElementById(`chapter-btn-${chapter}`);
        let chapterNumber = parseInt(chapter, 10);

        // ✅ Find the correct row index in `rowEnd`
        let rowIndex = rowEnd.findIndex(end => chapterNumber <= end);
        let lastButtonInRow = document.getElementById(`chapter-btn-${rowEnd[rowIndex]}`);

        console.log(`🔢 Chapter ${chapter} will be inserted after row ending with button ${rowEnd[rowIndex]}`);

        // Ensure correct insertion order
        if (lastInserted && lastInserted.id === `chapter-content-${openChapters[openChapters.length - 1]}`) {
            lastInserted.parentNode.insertBefore(chapterContent, lastInserted.nextSibling);
        } else {
            lastButtonInRow.parentNode.insertBefore(chapterContent, lastButtonInRow.nextSibling);
        }

        lastInserted = chapterContent;
    });
}

// 📖 Toggle chapter visibility and load content
function toggleChapter(chapter) {
    let existingContent = document.getElementById(`chapter-content-${chapter}`);

    // If content already exists, remove it (toggle off)
    if (existingContent) {
        existingContent.remove();
        openChapters = openChapters.filter(ch => ch !== chapter);
        updateCollapseButton();
        return;
    }

    console.log(`📖 Attempting to load Chapter ${chapter}`);

    // Fetch and load the chapter content
    fetch(`./${chapter}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Chapter not found.");
            }
            return response.text();
        })
        .then(data => {
            console.log(`✅ Successfully fetched Chapter ${chapter}`);

            openChapters.push(chapter);
            openChapters.sort((a, b) => a - b);

            positionChapters();
            updateCollapseButton();
        })
        .catch(error => console.error("❌ Fetch Error:", error));
}

// 📌 Collapse all open chapters
function collapseAll() {
    openChapters.forEach(chapter => {
        let existingContent = document.getElementById(`chapter-content-${chapter}`);
        if (existingContent) existingContent.remove();
    });
    openChapters = [];
    updateCollapseButton();
}

// 🎯 Show/hide "Collapse All" button
function updateCollapseButton() {
    let collapseBtn = document.getElementById("collapse-button");
    if (openChapters.length >= 2) {
        collapseBtn.classList.remove("hidden");
    } else {
        collapseBtn.classList.add("hidden");
    }
}

// 🚀 Initialize rows on page load
document.addEventListener("DOMContentLoaded", () => {
    currentCols = getColumnCount();
    calculateRowEnd();
});