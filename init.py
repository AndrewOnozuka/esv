import os

# Define the base directory (update this to match your actual project)
base_dir = "/Users/ryoandrewonozuka/Documents/GitHub/esv"

# Define the books and their respective chapter counts
bible_books = {
    "Genesis": 50, "Exodus": 40, "Leviticus": 27, "Numbers": 36, "Deuteronomy": 34,
    "Joshua": 24, "Judges": 21, "Ruth": 4, "1 Samuel": 31, "2 Samuel": 24, "1 Kings": 22, "2 Kings": 25,
    "1 Chronicles": 29, "2 Chronicles": 36, "Ezra": 10, "Nehemiah": 13, "Esther": 10, "Job": 42,
    "Psalms": 150, "Proverbs": 31, "Ecclesiastes": 12, "Song of Solomon": 8, "Isaiah": 66,
    "Jeremiah": 52, "Lamentations": 5, "Ezekiel": 48, "Daniel": 12, "Hosea": 14, "Joel": 3,
    "Amos": 9, "Obadiah": 1, "Jonah": 4, "Micah": 7, "Nahum": 3, "Habakkuk": 3,
    "Zephaniah": 3, "Haggai": 2, "Zechariah": 14, "Malachi": 4,
    "Matthew": 28, "Mark": 16, "Luke": 24, "John": 21, "Acts": 28,
    "Romans": 16, "1 Corinthians": 16, "2 Corinthians": 13, "Galatians": 6, "Ephesians": 6,
    "Philippians": 4, "Colossians": 4, "1 Thessalonians": 5, "2 Thessalonians": 3, "1 Timothy": 6,
    "2 Timothy": 4, "Titus": 3, "Philemon": 1, "Hebrews": 13, "James": 5,
    "1 Peter": 5, "2 Peter": 3, "1 John": 5, "2 John": 1, "3 John": 1, "Jude": 1, "Revelation": 22
}

# Separate books into Old and New Testament
old_testament_books = list(bible_books.keys())[:39]  # First 39 books are OT
new_testament_books = list(bible_books.keys())[39:]  # Remaining 27 books are NT

# Function to check and create missing books/chapters
def ensure_bible_structure():
    for book, chapters in bible_books.items():
        # Determine whether it's an OT or NT book
        testament_folder = "ot" if book in old_testament_books else "nt"
        book_dir = os.path.join(base_dir, testament_folder, book.replace(" ", ""))

        # Ensure the book directory exists
        if not os.path.exists(book_dir):
            os.makedirs(book_dir)
            print(f"✅ Created directory: {book_dir}")

        # Check for missing chapters and create them
        for chapter in range(1, chapters + 1):
            chapter_file = os.path.join(book_dir, f"{chapter}.html")

            if not os.path.exists(chapter_file):
                with open(chapter_file, "w") as file:
                    file.write(f'<h2 class="text-2xl font-semibold mb-4">{book} {chapter}</h2>\n\n')
                print(f"📄 Created: {chapter_file}")

    print("\n✅ Bible structure is now complete. Missing files have been added.")

# Run the script
ensure_bible_structure()