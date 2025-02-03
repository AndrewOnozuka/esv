let openChapters = [];

function toggleChapter(chapter) {
    let existingContent = document.getElementById(`chapter-content-${chapter}`);

    // If content exists, remove it (toggle off)
    if (existingContent) {
        existingContent.remove();
        openChapters = openChapters.filter(ch => ch !== chapter);
        updateDisplayedChapters();
        updateCollapseButton();
        return;
    }

    // Fetch and load the chapter content
    fetch(`./${chapter}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Chapter not found.");
            }
            return response.text();
        })
        .then(data => {
            // Create a new div for chapter content
            let newContent = document.createElement("div");
            newContent.id = `chapter-content-${chapter}`;
            newContent.className = "bg-white p-6 rounded-lg shadow-lg col-span-full mt-4";
            newContent.innerHTML = data;

            // Add chapter to openChapters list and sort in correct order
            openChapters.push(chapter);
            openChapters.sort((a, b) => a - b); // Always keep in ascending order

            updateDisplayedChapters();
            updateCollapseButton();
        })
        .catch(error => {
            console.error("Error loading chapter:", error);
        });
}

// Function to ensure chapters stay ordered but buttons remain in place
function updateDisplayedChapters() {
    let chapterGrid = document.getElementById("chapter-grid");
    let buttons = Array.from(chapterGrid.children);
    let cols = getComputedStyle(chapterGrid).gridTemplateColumns.split(" ").length;

    // Find where the first info should be inserted (below the last button in the first occupied row)
    let firstRowEndIndex = Math.floor((openChapters[0] - 1) / cols) * cols + (cols - 1);
    let lastButtonInRow = buttons[firstRowEndIndex] || buttons[buttons.length - 1];

    // Remove all existing chapter content before re-inserting in the correct order
    document.querySelectorAll('[id^="chapter-content-"]').forEach(el => el.remove());

    // Re-insert in the correct order
    openChapters.forEach(ch => {
        let content = document.createElement("div");
        content.id = `chapter-content-${ch}`;
        content.className = "bg-white p-6 rounded-lg shadow-lg col-span-full mt-4";
        content.innerHTML = `<p>Loading chapter ${ch}...</p>`;

        lastButtonInRow.parentNode.insertBefore(content, lastButtonInRow.nextSibling);
        lastButtonInRow = content; // Update reference for next insertion

        // Fetch and insert actual chapter content
        fetch(`./${ch}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Chapter ${ch} not found.`);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById(`chapter-content-${ch}`).innerHTML = data;
            })
            .catch(error => {
                console.error(`Error loading chapter ${ch}:`, error);
                document.getElementById(`chapter-content-${ch}`).innerHTML = `<p class="text-red-500">Error loading chapter ${ch}.</p>`;
            });
    });
}

// Collapse All Function
function collapseAll() {
    openChapters.forEach(chapter => {
        let existingContent = document.getElementById(`chapter-content-${chapter}`);
        if (existingContent) existingContent.remove();
    });
    openChapters = [];
    updateCollapseButton();
}

// Update Collapse Button Visibility
function updateCollapseButton() {
    let collapseBtn = document.getElementById("collapse-button");
    if (openChapters.length >= 2) {
        collapseBtn.classList.remove("hidden");
    } else {
        collapseBtn.classList.add("hidden");
    }
}