fetch('./quotes.json')
    .then((response) => response.json())
    .then((json) => {

        const categories = document.querySelectorAll('.category');
        const generate = document.getElementById("generate");
        const quote = document.getElementById("quote");

        // This will hold the current quotes based on selected category
        let currentQuotes = [];

        categories.forEach(category => {
            category.addEventListener('change', () => {
                // Get the selected category value
                const selectedCategory = category.value;

                // Update the currentQuotes based on selected category
                currentQuotes = getQuotesByCategory(selectedCategory);
            });
        });

        // Fetch a random quote when the generate button is clicked
        generate.addEventListener("click", () => {
            if (currentQuotes.length > 0) {
                // Select a random quote from the currentQuotes
                let randomIndex = Math.floor(Math.random() * currentQuotes.length);
                let q = currentQuotes[randomIndex].quote;
                quote.textContent = q;
            } else {
                quote.textContent = "No quotes available for this category.";
            }
        });

        // Function to get quotes by category
        function getQuotesByCategory(cat) {
            return json.filter(quote => quote.category === cat);
        }
    })
    .catch((error) => {
        console.error('Error fetching quotes:', error);
    });
