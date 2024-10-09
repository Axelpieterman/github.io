class Menu {
    constructor() {
        this.sections = [
            {
                category: "LUNCH",
                sections: [
                    {
                        title: "SANDWICHES",
                        items: [
                            { name: "CHICKEN SANDWICH", ingredients: "Grilled chicken, lettuce, tomato, mayo", price: "$24" },
                            { name: "ROASTED BEEF", ingredients: "Slow-roasted beef, horseradish sauce, arugula", price: "$53" },
                            { name: "HAM SANDWICH", ingredients: "Black forest ham, Swiss cheese, Dijon mustard", price: "$8" },
                            { name: "VEGGIE DELIGHT", ingredients: "Grilled vegetables, hummus, spinach", price: "$18" },
                            { name: "TUNA MELT", ingredients: "Tuna salad, cheddar cheese, tomato", price: "$22" },
                            { name: "CLUB SANDWICH", ingredients: "Turkey, bacon, lettuce, tomato, mayo", price: "$26" }
                        ]
                    },
                    {
                        title: "SALADS",
                        items: [
                            { name: "CAESAR SALAD", ingredients: "Romaine lettuce, croutons, parmesan, Caesar dressing", price: "$12" },
                            { name: "GREEK SALAD", ingredients: "Mixed greens, feta, olives, red onion, cucumber", price: "$14" },
                            { name: "COBB SALAD", ingredients: "Chicken, bacon, avocado, blue cheese, egg, tomato", price: "$16" }
                        ]
                    },
                    {
                        title: "SOUPS",
                        items: [
                            { name: "TOMATO BISQUE", ingredients: "Creamy tomato soup with basil", price: "$8" },
                            { name: "FRENCH ONION", ingredients: "Caramelized onions, beef broth, gruyere cheese", price: "$10" },
                            { name: "CLAM CHOWDER", ingredients: "Clams, potatoes, celery in creamy broth", price: "$12" }
                        ]
                    }
                ]
            },
            {
                category: "DINNER",
                sections: [
                    {
                        title: "APPETIZERS",
                        items: [
                            { name: "BRUSCHETTA", ingredients: "Toasted bread, tomatoes, garlic, basil", price: "$10" },
                            { name: "CALAMARI", ingredients: "Fried squid rings with marinara sauce", price: "$14" },
                            { name: "STUFFED MUSHROOMS", ingredients: "Mushroom caps with herbed cream cheese", price: "$12" }
                        ]
                    },
                    {
                        title: "MAIN COURSE",
                        items: [
                            { name: "ROASTED TURKEY", ingredients: "Herb-roasted turkey, gravy, cranberry sauce", price: "$24" },
                            { name: "HONEY ROAST HAM", ingredients: "Glazed ham, pineapple chutney, roasted vegetables", price: "$22" },
                            { name: "GRILLED SALMON", ingredients: "Atlantic salmon, lemon butter sauce, asparagus", price: "$28" },
                            { name: "BEEF TENDERLOIN", ingredients: "Grass-fed beef, red wine reduction, truffle mashed potatoes", price: "$32" },
                            { name: "CHICKEN PARMESAN", ingredients: "Breaded chicken, marinara sauce, mozzarella, spaghetti", price: "$24" }
                        ]
                    },
                    {
                        title: "DESSERTS",
                        items: [
                            { name: "CHOCOLATE MOUSSE", ingredients: "Rich chocolate mousse with whipped cream", price: "$8" },
                            { name: "APPLE PIE", ingredients: "Homemade apple pie with vanilla ice cream", price: "$7" },
                            { name: "CHEESECAKE", ingredients: "New York style cheesecake with berry compote", price: "$9" }
                        ]
                    }
                ]
            },
            {
                category: "EXTRAS",
                sections: [
                    {
                        title: "SIDES",
                        items: [
                            { name: "FRENCH FRIES", ingredients: "Crispy golden fries with sea salt", price: "$5" },
                            { name: "ONION RINGS", ingredients: "Beer-battered onion rings", price: "$6" },
                            { name: "COLESLAW", ingredients: "Creamy cabbage and carrot slaw", price: "$4" },
                            { name: "MASHED POTATOES", ingredients: "Creamy mashed potatoes with gravy", price: "$5" }
                        ]
                    },
                    {
                        title: "SAUCES",
                        items: [
                            { name: "GARLIC AIOLI", ingredients: "Creamy garlic sauce", price: "$2" },
                            { name: "BBQ SAUCE", ingredients: "Smoky barbecue sauce", price: "$2" },
                            { name: "RANCH DRESSING", ingredients: "Creamy herb dressing", price: "$2" }
                        ]
                    }
                ]
            },
            {
                category: "DRINKS",
                sections: [
                    {
                        title: "SOFT DRINKS",
                        items: [
                            { name: "COLA", ingredients: "Classic cola", price: "$3" },
                            { name: "LEMON-LIME SODA", ingredients: "Refreshing citrus soda", price: "$3" },
                            { name: "ICED TEA", ingredients: "Freshly brewed iced tea", price: "$3" }
                        ]
                    },
                    {
                        title: "HOT BEVERAGES",
                        items: [
                            { name: "COFFEE", ingredients: "Freshly brewed coffee", price: "$3" },
                            { name: "ESPRESSO", ingredients: "Single shot of espresso", price: "$3" },
                            { name: "CAPPUCCINO", ingredients: "Espresso with steamed milk and foam", price: "$4" },
                            { name: "HOT TEA", ingredients: "Assorted tea selection", price: "$3" }
                        ]
                    },
                    {
                        title: "ALCOHOLIC BEVERAGES",
                        items: [
                            { name: "HOUSE WINE", ingredients: "Red or white wine", price: "$7" },
                            { name: "DRAFT BEER", ingredients: "Selection of local craft beers", price: "$6" },
                            { name: "COCKTAIL OF THE DAY", ingredients: "Ask your server for details", price: "$10" }
                        ]
                    }
                ]
            }
        ];
        this.currentPage = 0;
        this.sectionsPerPage = 3;
    }

    render() {
        const currentCategory = this.sections[this.currentPage];
        const columnsPerRow = 3; // Always display 3 columns

        let html = '<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">';

        for (let i = 0; i < columnsPerRow; i++) {
            html += '<div class="flex flex-col">';
            if (i < currentCategory.sections.length) {
                const section = currentCategory.sections[i];
                html += `
                    <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ritz-brown border-b-2 border-ritz-brown pb-3 mb-6 font-bold">${section.title}</h2>
                    <div class="flex-grow">
                        ${section.items.map(item => `
                            <div class="flex justify-between items-baseline mb-6 pb-6 border-b border-ritz-brown border-opacity-30 last:border-b-0">
                                <div class="flex flex-col">
                                    <span class="text-xl sm:text-2xl md:text-3xl font-semibold text-ritz-brown">${item.name}</span>
                                    <span class="text-base sm:text-lg md:text-xl italic text-ritz-brown text-opacity-80">${item.ingredients || ''}</span>
                                </div>
                                <span class="price text-xl sm:text-2xl md:text-3xl font-bold italic text-ritz-brown">${item.price}</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    nextPage() {
        if (this.currentPage < this.sections.length - 1) {
            this.currentPage++;
            return true;
        }
        return false;
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            return true;
        }
        return false;
    }

    getCurrentCategory() {
        return this.sections[this.currentPage].category;
    }
}