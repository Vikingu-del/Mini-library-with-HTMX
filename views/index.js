const createHomepageTemplate = () => {
    return /*html*/ `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>My Reading List</title>
            <script src="https://unpkg.com/htmx.org@2.0.3" integrity="sha384-0895/pl2MU10Hqc6jd4RvrthNlDiE9U1tWmX7WRESftEDRosgxNsQG/Ze9YMRzHq" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
            <header>
                <h1>My Reading List</h1>
            </header>
            <main>
                <div class="search" style="text-align: center;">
                    <input 
                        type="search"
                        name="search"
                        placeholder="search books by title..."
                        hx-post="/books/search"
                        hx-trigger="keyup changed delay:300ms"
                        hx-target=".book-list"
                    />
                </div>
                <div class="book-list">
                    <button hx-get="/books" hx-target=".book-list">Show Books</button>
                    <!-- here -->
                </div>
                <div class="add-book-form">
                    <h2>What do you want to read?</h2>
                    <form>
                        <input 
                            type="text"
                            name="title"
                            placeholder="title"
                            required                       
                        />
                        <input 
                            type="text"
                            name="author"
                            placeholder="author"
                            required                       
                        />
                        <button
                            hx-on::after-request="document.querySelector('form').reset()"
                            hx-on:click="console.log('new book added', event)"
                            hx-post="/books"
                            hx-target=".book-list ul"
                            hx-swap="beforeend">Add Book</button>
                    </form>
                </div>
            </main>
        </body>
        </html>
    `;
}

export default createHomepageTemplate;