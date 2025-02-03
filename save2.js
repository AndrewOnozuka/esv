// // let openChapters = [];
// // let currentCols = 0;

// // console.log("✅ dynamicRows.js is loaded!");

// // document.addEventListener("DOMContentLoaded", () => {
// //     currentCols = getColumnCount();
// // });

// // function getColumnCount() {
// //     let chapterGrid = document.getElementById("chapter-grid");
// //     return getComputedStyle(chapterGrid).gridTemplateColumns.split(" ").length;
// // }

// // function toggleChapter(chapter) {
// //     let existingContent = document.getElementById(`chapter-content-${chapter}`);

// //     // If content already exists, remove it (toggle off)
// //     if (existingContent) {
// //         existingContent.remove();
// //         openChapters = openChapters.filter(ch => ch !== chapter);
// //         updateCollapseButton();
// //         return;
// //     }

// //     // Fetch and load the chapter content
// //     fetch(`./${chapter}.html`)
// //         .then(response => {
// //             if (!response.ok) {
// //                 throw new Error("Chapter not found.");
// //             }
// //             return response.text();
// //         })
// //         .then(data => {
// //             // Create a new div for chapter content
// //             let newContent = document.createElement("div");
// //             newContent.id = `chapter-content-${chapter}`;
// //             newContent.className = "bg-white p-6 rounded-lg shadow-lg col-span-full mt-4";
// //             newContent.innerHTML = data;

// //             // Maintain ordered list of open chapters
// //             openChapters.push(chapter);
// //             openChapters.sort((a, b) => a - b);

// //             // Ensure correct positioning of chapters
// //             positionChapters();

// //             updateCollapseButton();
// //         })
// //         .catch(error => {
// //             console.error("Error loading chapter:", error);
// //         });
// // }

// // function positionChapters() {
// //     let chapterGrid = document.getElementById("chapter-grid");
// //     let buttons = Array.from(chapterGrid.children);

// //     // Recalculate row groupings based on the new column count
// //     let rows = {};
// //     buttons.forEach((button, index) => {
// //         let row = Math.floor(index / currentCols);
// //         if (!rows[row]) rows[row] = [];
// //         rows[row].push(button);
// //     });

// //     let lastInserted = null;

// //     openChapters.forEach(chapter => {
// //         let chapterContent = document.getElementById(`chapter-content-${chapter}`);
// //         if (!chapterContent) return;

// //         let button = document.getElementById(`chapter-btn-${chapter}`);
// //         let buttonIndex = buttons.indexOf(button);
// //         let row = Math.floor(buttonIndex / currentCols);

// //         // Insert content after the last button in its row
// //         let lastButtonInRow = rows[row][rows[row].length - 1];

// //         if (lastInserted) {
// //             lastInserted.parentNode.insertBefore(chapterContent, lastInserted.nextSibling);
// //         } else {
// //             lastButtonInRow.parentNode.insertBefore(chapterContent, lastButtonInRow.nextSibling);
// //         }

// //         lastInserted = chapterContent;
// //     });
// // }

// // function collapseAll() {
// //     openChapters.forEach(chapter => {
// //         let existingContent = document.getElementById(`chapter-content-${chapter}`);
// //         if (existingContent) existingContent.remove();
// //     });
// //     openChapters = [];
// //     updateCollapseButton();
// // }

// // function updateCollapseButton() {
// //     let collapseBtn = document.getElementById("collapse-button");
// //     if (openChapters.length >= 2) {
// //         collapseBtn.classList.remove("hidden");
// //     } else {
// //         collapseBtn.classList.add("hidden");
// //     }
// // }

// // // Detect screen resize and reapply positioning dynamically
// // window.addEventListener("resize", () => {
// //     let newCols = getColumnCount();
// //     if (newCols !== currentCols) {
// //         currentCols = newCols;
// //         positionChapters();
// //     }
// // });

// document.addEventListener("DOMContentLoaded", function () {
//     let openChapters = [];

//     function getColumnCount() {
//         const chapterGrid = document.getElementById("chapter-grid");
//         return getComputedStyle(chapterGrid).gridTemplateColumns.split(" ").length;
//     }

//     function getRowStartIndex(buttonIndex, columns) {
//         return Math.floor(buttonIndex / columns) * columns;
//     }

//     function toggleChapter(chapter) {
//         let existingContent = document.getElementById(`chapter-content-${chapter}`);

//         // Remove content if it exists (toggle off)
//         if (existingContent) {
//             existingContent.remove();
//             openChapters = openChapters.filter(ch => ch !== chapter);
//             updateCollapseButton();
//             return;
//         }

//         // Fetch and load the chapter content
//         fetch(`./${chapter}.html`)
//             .then(response => {
//                 if (!response.ok) throw new Error("Chapter not found.");
//                 return response.text();
//             })
//             .then(data => {
//                 let newContent = document.createElement("div");
//                 newContent.id = `chapter-content-${chapter}`;
//                 newContent.className = "bg-white p-6 rounded-lg shadow-lg col-span-full mt-4";
//                 newContent.innerHTML = data;

//                 let chapterGrid = document.getElementById("chapter-grid");
//                 let buttons = Array.from(chapterGrid.children);
//                 let chapterButton = document.getElementById(`chapter-btn-${chapter}`);

//                 let columns = getColumnCount();
//                 let buttonIndex = buttons.indexOf(chapterButton);
//                 let rowStartIndex = getRowStartIndex(buttonIndex, columns);

//                 // Find the last button in the row
//                 let lastButtonInRow = buttons[rowStartIndex + columns - 1] || buttons[buttons.length - 1];

//                 // Insert in the correct order
//                 let insertAfter = lastButtonInRow;
//                 openChapters.push(chapter);
//                 openChapters.sort((a, b) => a - b);

//                 for (let ch of openChapters) {
//                     let chContent = document.getElementById(`chapter-content-${ch}`);
//                     if (chContent) insertAfter = chContent;
//                 }

//                 insertAfter.parentNode.insertBefore(newContent, insertAfter.nextSibling);
//                 updateCollapseButton();
//             })
//             .catch(error => console.error("Error loading chapter:", error));
//     }

//     function collapseAll() {
//         openChapters.forEach(chapter => {
//             let existingContent = document.getElementById(`chapter-content-${chapter}`);
//             if (existingContent) existingContent.remove();
//         });
//         openChapters = [];
//         updateCollapseButton();
//     }

//     function updateCollapseButton() {
//         let collapseBtn = document.getElementById("collapse-button");
//         collapseBtn.classList.toggle("hidden", openChapters.length < 2);
//     }

//     window.toggleChapter = toggleChapter;
//     window.collapseAll = collapseAll;
// });
// let openChapters = [];
// let currentCols = 0;

// console.log("✅ dynamicRows.js is loaded!");

// document.addEventListener("DOMContentLoaded", () => {
//     currentCols = getColumnCount();
// });

// function getColumnCount() {
//     let chapterGrid = document.getElementById("chapter-grid");
//     return getComputedStyle(chapterGrid).gridTemplateColumns.split(" ").length;
// }

// function toggleChapter(chapter) {
//     let existingContent = document.getElementById(`chapter-content-${chapter}`);

//     // If content already exists, remove it (toggle off)
//     if (existingContent) {
//         existingContent.remove();
//         openChapters = openChapters.filter(ch => ch !== chapter);
//         updateCollapseButton();
//         return;
//     }

//     // Fetch and load the chapter content
//     fetch(`./${chapter}.html`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Chapter not found.");
//             }
//             return response.text();
//         })
//         .then(data => {
//             // Create a new div for chapter content
//             let newContent = document.createElement("div");
//             newContent.id = `chapter-content-${chapter}`;
//             newContent.className = "bg-white p-6 rounded-lg shadow-lg col-span-full mt-4";
//             newContent.innerHTML = data;

//             // Ensure chapters are ordered correctly
//             insertChapterContent(chapter, newContent);

//             updateCollapseButton();
//         })
//         .catch(error => {
//             console.error("❌ Error loading chapter:", error);
//         });
// }

// function insertChapterContent(chapter, newContent) {
//     let chapterGrid = document.getElementById("chapter-grid");
//     let buttons = Array.from(chapterGrid.children);
//     let button = document.getElementById(`chapter-btn-${chapter}`);

//     if (!button) {
//         console.error(`❌ Button for chapter ${chapter} not found.`);
//         return;
//     }

//     // Maintain ordered list of open chapters
//     openChapters.push(chapter);
//     openChapters.sort((a, b) => a - b);

//     let cols = getColumnCount();
//     let buttonIndex = buttons.indexOf(button);
//     let rowStartIndex = Math.floor(buttonIndex / cols) * cols;

//     let lastInserted = null;

//     openChapters.forEach(ch => {
//         let chapterContent = document.getElementById(`chapter-content-${ch}`);
//         if (!chapterContent) return;

//         let chButton = document.getElementById(`chapter-btn-${ch}`);
//         let chButtonIndex = buttons.indexOf(chButton);
//         let chRow = Math.floor(chButtonIndex / cols);

//         let rowButtons = buttons.slice(chRow * cols, (chRow + 1) * cols);
//         let lastButtonInRow = rowButtons[rowButtons.length - 1];

//         if (lastInserted) {
//             lastInserted.parentNode.insertBefore(chapterContent, lastInserted.nextSibling);
//         } else {
//             lastButtonInRow.parentNode.insertBefore(chapterContent, lastButtonInRow.nextSibling);
//         }

//         lastInserted = chapterContent;
//     });
// }

// // ✅ This function is now properly defined
// function positionChapters() {
//     let chapterGrid = document.getElementById("chapter-grid");
//     let buttons = Array.from(chapterGrid.children);

//     openChapters.sort((a, b) => a - b);

//     let lastInserted = null;

//     openChapters.forEach(chapter => {
//         let chapterContent = document.getElementById(`chapter-content-${chapter}`);
//         if (!chapterContent) return;

//         let button = document.getElementById(`chapter-btn-${chapter}`);
//         let buttonIndex = buttons.indexOf(button);
//         let row = Math.floor(buttonIndex / currentCols);

//         let rowButtons = buttons.slice(row * currentCols, (row + 1) * currentCols);
//         let lastButtonInRow = rowButtons[rowButtons.length - 1];

//         if (lastInserted) {
//             lastInserted.parentNode.insertBefore(chapterContent, lastInserted.nextSibling);
//         } else {
//             lastButtonInRow.parentNode.insertBefore(chapterContent, lastButtonInRow.nextSibling);
//         }

//         lastInserted = chapterContent;
//     });
// }

// function collapseAll() {
//     openChapters.forEach(chapter => {
//         let existingContent = document.getElementById(`chapter-content-${chapter}`);
//         if (existingContent) existingContent.remove();
//     });
//     openChapters = [];
//     updateCollapseButton();
// }

// function updateCollapseButton() {
//     let collapseBtn = document.getElementById("collapse-button");
//     if (openChapters.length >= 2) {
//         collapseBtn.classList.remove("hidden");
//     } else {
//         collapseBtn.classList.add("hidden");
//     }
// }

// // ✅ Now screen resizes dynamically update row positions
// window.addEventListener("resize", () => {
//     let newCols = getColumnCount();
//     if (newCols !== currentCols) {
//         currentCols = newCols;
//         positionChapters();
//     }
// });




let openChapters = [];
let currentCols = 0;

console.log("✅ dynamicRows.js is loaded!");

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
    currentCols = getColumnCount();
});

// Function to get current column count dynamically
function getColumnCount() {
    let chapterGrid = document.getElementById("chapter-grid");
    return getComputedStyle(chapterGrid).gridTemplateColumns.split(" ").length;
}

function toggleChapter(chapter) {
    console.log(`📖 Attempting to load Chapter ${chapter}`);

    let existingContent = document.getElementById(`chapter-content-${chapter}`);

    // If content exists, remove it (toggle off)
    if (existingContent) {
        console.log(`❌ Removing Chapter ${chapter}`);
        existingContent.remove();
        openChapters = openChapters.filter(ch => ch !== chapter);
        updateCollapseButton();
        return;
    }

    fetch(`./${chapter}.html`)
        .then(response => {
            if (!response.ok) throw new Error(`Chapter ${chapter} not found.`);
            return response.text();
        })
        .then(data => {
            console.log(`✅ Successfully fetched Chapter ${chapter}`);

            let newContent = document.createElement("div");
            newContent.id = `chapter-content-${chapter}`;
            newContent.className = "bg-white p-6 rounded-lg shadow-lg col-span-full mt-4";
            newContent.innerHTML = data;

            console.log(`📌 Adding Chapter ${chapter} to the page`);
            
            openChapters.push(chapter);
            openChapters.sort((a, b) => a - b);  // Maintain order

            insertChapterContent(chapter, newContent);
            updateCollapseButton();
        })
        .catch(error => console.error("❌ Fetch Error:", error));
}

function insertChapterContent(chapter, newContent) {
    let chapterGrid = document.getElementById("chapter-grid");
    let buttons = Array.from(chapterGrid.children);

    let button = document.getElementById(`chapter-btn-${chapter}`);
    let buttonIndex = buttons.indexOf(button);

    if (buttonIndex === -1) {
        console.error(`❌ Button for Chapter ${chapter} not found.`);
        return;
    }

    let cols = getColumnCount();
    let rowStartIndex = Math.floor(buttonIndex / cols) * cols;
    let lastButtonInRow = buttons[rowStartIndex + cols - 1] || buttons[buttons.length - 1];

    console.log(`🔢 Chapter ${chapter} will be inserted after row ending with button ${lastButtonInRow.innerText}`);

    // Ensure proper ordering
    let lastInserted = null;
    for (let ch of openChapters) {
        let chContent = document.getElementById(`chapter-content-${ch}`);
        if (chContent) lastInserted = chContent;
    }

    if (lastInserted) {
        lastInserted.parentNode.insertBefore(newContent, lastInserted.nextSibling);
    } else {
        lastButtonInRow.parentNode.insertBefore(newContent, lastButtonInRow.nextSibling);
    }
}

function collapseAll() {
    openChapters.forEach(chapter => {
        let existingContent = document.getElementById(`chapter-content-${chapter}`);
        if (existingContent) existingContent.remove();
    });
    openChapters = [];
    updateCollapseButton();
}

function updateCollapseButton() {
    let collapseBtn = document.getElementById("collapse-button");
    if (openChapters.length >= 2) {
        collapseBtn.classList.remove("hidden");
    } else {
        collapseBtn.classList.add("hidden");
    }
}

// Detect screen resize and recalculate column numbers
window.addEventListener("resize", () => {
    let newCols = getColumnCount();
    if (newCols !== currentCols) {
        console.log(`🖥️ Screen resized: Adjusting from ${currentCols} to ${newCols} columns`);
        currentCols = newCols;
        positionChapters();
    }
});