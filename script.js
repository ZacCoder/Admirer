
/* =========================================
   THE ADMIRER'S NOTEBOOK
   Project 02 — JavaScript
   ========================================= */

// Get the main elements
const book = document.getElementById("book");
const bookCover = document.getElementById("bookCover");
const bookPages = document.getElementById("bookPages");

const openBookButton = document.getElementById("openBookButton");
const bookControls = document.getElementById("bookControls");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const currentPageDisplay = document.getElementById("currentPage");
const closingNote = document.getElementById("closingNote");

// Collect all notebook pages
const pages = Array.from(document.querySelectorAll(".page"));

// Current page
let currentPage = 1;

// Total number of pages
const totalPages = pages.length;

// Prevent multiple rapid page turns
let isTurning = false;


/* =========================================
   OPEN THE NOTEBOOK
   ========================================= */

function openBook() {

    if (!book) return;

    // Add the open animation class
    book.classList.add("open");

    // Reveal the notebook controls
    bookControls.classList.remove("hidden");

    // Display the first page
    currentPage = 1;
    showPage(currentPage);

    // Update the page counter
    updatePageControls();

    // Hide the closing message if it was previously shown
    closingNote.classList.add("hidden");
}


/* =========================================
   DISPLAY A SPECIFIC PAGE
   ========================================= */

function showPage(pageNumber) {

    pages.forEach((page, index) => {

        page.classList.remove("page-enter");

        if (index + 1 === pageNumber) {

            page.classList.remove("hidden");

            // Restart the entrance animation
            void page.offsetWidth;

            page.classList.add("page-enter");

        } else {

            page.classList.add("hidden");

        }

    });

    // Update the page counter
    currentPage = pageNumber;

    updatePageControls();
}


/* =========================================
   UPDATE PAGE BUTTONS
   ========================================= */

function updatePageControls() {

    if (currentPageDisplay) {
        currentPageDisplay.textContent =
            `${currentPage} / ${totalPages}`;
    }

    if (previousButton) {
        previousButton.disabled = currentPage === 1;
    }

    if (nextButton) {

        if (currentPage === totalPages) {
            nextButton.textContent = "Finish notebook ✓";
        } else {
            nextButton.textContent = "Next page →";
        }

    }
}


/* =========================================
   NEXT PAGE
   ========================================= */

function nextPage() {

    if (isTurning) return;

    if (currentPage < totalPages) {

        isTurning = true;

        showPage(currentPage + 1);

        setTimeout(() => {
            isTurning = false;
        }, 450);

    } else {

        // All pages have been read
        finishNotebook();

    }

}


/* =========================================
   PREVIOUS PAGE
   ========================================= */

function previousPage() {

    if (isTurning) return;

    if (currentPage > 1) {

        isTurning = true;

        showPage(currentPage - 1);

        setTimeout(() => {
            isTurning = false;
        }, 450);

    }

}


/* =========================================
   FINISH THE NOTEBOOK
   ========================================= */

function finishNotebook() {

    // Hide the book and its navigation controls
    book.classList.add("hidden");
    bookControls.classList.add("hidden");

    // Show the final closing note
    closingNote.classList.remove("hidden");

    // Bring the closing message into view
    closingNote.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================
   RESTART THE NOTEBOOK
   ========================================= */

function restartBook() {

    // Reset the current page
    currentPage = 1;

    // Reset animation lock
    isTurning = false;

    // Bring the book back
    book.classList.remove("hidden");
    book.classList.remove("open");

    // Hide the navigation and closing message
    bookControls.classList.add("hidden");
    closingNote.classList.add("hidden");

    // Reset all pages
    pages.forEach(page => {
        page.classList.remove("page-enter");
        page.classList.add("hidden");
    });

    // Reset the counter
    if (currentPageDisplay) {
        currentPageDisplay.textContent = `1 / ${totalPages}`;
    }

    // Restore the first page for the next opening
    if (pages.length > 0) {
        pages[0].classList.remove("hidden");
    }

    // Reset button labels
    if (nextButton) {
        nextButton.textContent = "Next page →";
    }

    if (previousButton) {
        previousButton.disabled = true;
    }

    // Return to the top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   BUTTON EVENT LISTENERS
   ========================================= */

// Open notebook
if (openBookButton) {
    openBookButton.addEventListener("click", openBook);
}

// Next page
if (nextButton) {
    nextButton.addEventListener("click", nextPage);
}

// Previous page
if (previousButton) {
    previousButton.addEventListener("click", previousPage);
}


/* =========================================
   INITIAL PAGE SETUP
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Make sure the notebook starts closed
    if (book) {
        book.classList.remove("open");
    }

    // Hide all pages except the first
    pages.forEach((page, index) => {

        if (index === 0) {
            page.classList.remove("hidden");
        } else {
            page.classList.add("hidden");
        }

    });

    // Hide navigation and closing message initially
    bookControls.classList.add("hidden");
    closingNote.classList.add("hidden");

    // Initialize page counter and buttons
    currentPage = 1;
    updatePageControls();

});
