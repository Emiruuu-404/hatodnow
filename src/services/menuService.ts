export interface MenuItem {
    id: string;
    restaurantId: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    available: boolean;
    variants?: {
        name: string;
        price: number;
    }[];
    popular?: boolean;
}

export const MOCK_MENU_ITEMS: MenuItem[] = [
    // Jollibee Sipocot (ID: 1)
    {
        id: 'm1',
        restaurantId: '1',
        name: '1pc Chickenjoy w/ Rice',
        description: 'Philippines\' best-tasting crispylicious, juicylicious fried chicken',
        price: 89,
        image: 'https://placehold.co/300x200/ef4444/ffffff?text=Chickenjoy',
        category: 'Chicken',
        available: true,
        popular: true,
    },
    {
        id: 'm2',
        restaurantId: '1',
        name: 'Jolly Spaghetti',
        description: 'Sweet-style spaghetti with chunky slices of savory ham and sausages',
        price: 60,
        image: 'https://placehold.co/300x200/dc2626/ffffff?text=Jolly+Spag',
        category: 'Pasta',
        available: true,
        popular: true,
    },
    {
        id: 'm3',
        restaurantId: '1',
        name: 'Yumburger',
        description: '100% pure beef patty with special burger dressing',
        price: 40,
        image: 'https://placehold.co/300x200/fbbf24/ffffff?text=Yumburger',
        category: 'Burgers',
        available: true,
    },

    // Biggs Sipocot (ID: 2)
    {
        id: 'm4',
        restaurantId: '2',
        name: 'Biggs Fried Chicken',
        description: 'Signature crispy fried chicken with rice',
        price: 185,
        image: 'https://placehold.co/300x200/dc2626/ffffff?text=Biggs+Chicken',
        category: 'Main Course',
        available: true,
        popular: true,
    },
    {
        id: 'm5',
        restaurantId: '2',
        name: 'Carbonara',
        description: 'Creamy white sauce pasta with bacon bits',
        price: 150,
        image: 'https://placehold.co/300x200/fcd34d/ffffff?text=Carbonara',
        category: 'Pasta',
        available: true,
    },
    {
        id: 'm6',
        restaurantId: '2',
        name: 'Pork Cordon Bleu',
        description: 'Breaded pork loin rolled with ham and cheese',
        price: 220,
        image: 'https://placehold.co/300x200/f59e0b/ffffff?text=Cordon+Bleu',
        category: 'Main Course',
        available: true,
    },

    // Dice 'N Brews (ID: 3)
    {
        id: 'm7',
        restaurantId: '3',
        name: 'Clubhouse Sandwich',
        description: 'Triple-decker sandwich with ham, egg, cheese, and vegetables',
        price: 150,
        image: 'https://placehold.co/300x200/78350f/ffffff?text=Clubhouse',
        category: 'Sandwiches',
        available: true,
        popular: true,
    },
    {
        id: 'm8',
        restaurantId: '3',
        name: 'Iced Caramel Macchiato',
        description: 'Espresso with vanilla syrup, milk, and caramel drizzle',
        price: 130,
        image: 'https://placehold.co/300x200/8c6b48/ffffff?text=Macchiato',
        category: 'Coffee',
        available: true,
    },
    {
        id: 'm9',
        restaurantId: '3',
        name: 'Beef Tapa',
        description: 'Marinated beef served with garlic rice and egg',
        price: 160,
        image: 'https://placehold.co/300x200/b91c1c/ffffff?text=Beef+Tapa',
        category: 'Breakfast',
        available: true,
    },

    // Thea's Seafood And Grill (ID: 4)
    {
        id: 'm10',
        restaurantId: '4',
        name: 'Grilled Tuna Belly',
        description: 'Fresh caught tuna belly grilled to perfection',
        price: 250,
        image: 'https://placehold.co/300x200/1d4ed8/ffffff?text=Tuna+Belly',
        category: 'Seafood',
        available: true,
        popular: true,
    },
    {
        id: 'm11',
        restaurantId: '4',
        name: 'Buttered Garlic Shrimp',
        description: 'Shrimp sautéed in butter and garlic sauce',
        price: 280,
        image: 'https://placehold.co/300x200/ea580c/ffffff?text=Shrimp',
        category: 'Seafood',
        available: true,
        popular: true,
    },
    {
        id: 'm12',
        restaurantId: '4',
        name: 'Sinigang na Hipon',
        description: 'Sour tamarind soup with shrimp and vegetables',
        price: 220,
        image: 'https://placehold.co/300x200/84cc16/ffffff?text=Sinigang',
        category: 'Soup',
        available: true,
    },

    // MIEKOYS SIPOCOT (ID: 5)
    {
        id: 'm13',
        restaurantId: '5',
        name: 'Hawaiian Overload',
        description: 'Loaded with ham, pineapple, and cheese',
        price: 300,
        image: 'https://placehold.co/300x200/f59e0b/ffffff?text=Hawaiian',
        category: 'Pizza',
        available: true,
        popular: true,
    },
    {
        id: 'm14',
        restaurantId: '5',
        name: 'Pepperoni & Cheese',
        description: 'Classic pepperoni slices on mozzarella cheese',
        price: 280,
        image: 'https://placehold.co/300x200/b91c1c/ffffff?text=Pepperoni',
        category: 'Pizza',
        available: true,
    },
    {
        id: 'm15',
        restaurantId: '5',
        name: 'Baked Macaroni',
        description: 'Cheesy baked macaroni with meaty sauce',
        price: 150,
        image: 'https://placehold.co/300x200/eab308/ffffff?text=Baked+Mac',
        category: 'Pasta',
        available: true,
    },

    // Jybon Chicken Inasal (ID: 6)
    {
        id: 'm16',
        restaurantId: '6',
        name: 'Chicken Inasal - Paa',
        description: 'Grilled chicken leg quarter with chicken oil and rice',
        price: 120,
        image: 'https://placehold.co/300x200/ea580c/ffffff?text=Inasal+Paa',
        category: 'Inasal',
        available: true,
        popular: true,
    },
    {
        id: 'm17',
        restaurantId: '6',
        name: 'Chicken Inasal - Pecho',
        description: 'Grilled chicken breast part with chicken oil and rice',
        price: 130,
        image: 'https://placehold.co/300x200/ea580c/ffffff?text=Inasal+Pecho',
        category: 'Inasal',
        available: true,
    },
    {
        id: 'm18',
        restaurantId: '6',
        name: 'Grilled Liempo',
        description: 'Pork belly marinated and grilled',
        price: 140,
        image: 'https://placehold.co/300x200/ca8a04/ffffff?text=Liempo',
        category: 'Grill',
        available: true,
    },

    // Explosive Burger (ID: 7)
    {
        id: 'm19',
        restaurantId: '7',
        name: 'Quarter Pounder',
        description: 'Pure beef patty with fresh lettuce and tomato',
        price: 150,
        image: 'https://placehold.co/300x200/b91c1c/ffffff?text=Burger',
        category: 'Burgers',
        available: true,
        popular: true,
    },
    {
        id: 'm20',
        restaurantId: '7',
        name: 'Cheesy Bacon Burger',
        description: 'Burger topped with melted cheese and crispy bacon',
        price: 180,
        image: 'https://placehold.co/300x200/f59e0b/ffffff?text=Bacon+Burger',
        category: 'Burgers',
        available: true,
    },
    {
        id: 'm21',
        restaurantId: '7',
        name: 'Crispy Fries',
        description: 'Golden fried potato strips',
        price: 60,
        image: 'https://placehold.co/300x200/fcd34d/ffffff?text=Fries',
        category: 'Sides',
        available: true,
    },

    // Nidas Kakanin (ID: 8)
    {
        id: 'm22',
        restaurantId: '8',
        name: 'Puto Cheese',
        description: 'Steamed rice cake topped with cheese (1 box)',
        price: 100,
        image: 'https://placehold.co/300x200/fcd34d/ffffff?text=Puto+Cheese',
        category: 'Kakanin',
        available: true,
        popular: true,
    },
    {
        id: 'm23',
        restaurantId: '8',
        name: 'Kutsinta',
        description: 'Sticky brown rice cake with grated coconut (1 box)',
        price: 90,
        image: 'https://placehold.co/300x200/78350f/ffffff?text=Kutsinta',
        category: 'Kakanin',
        available: true,
    },
    {
        id: 'm24',
        restaurantId: '8',
        name: 'Sapin-Sapin',
        description: 'Layered glutinous rice and coconut dessert',
        price: 120,
        image: 'https://placehold.co/300x200/a855f7/ffffff?text=Sapin-sapin',
        category: 'Kakanin',
        available: true,
    },

    // Hungry Spot Sisig (ID: 9)
    {
        id: 'm25',
        restaurantId: '9',
        name: 'Pork Sisig w/ Egg',
        description: 'Sizzling chopped pork with onion, chili, and egg',
        price: 120,
        image: 'https://placehold.co/300x200/d97706/ffffff?text=Sisig',
        category: 'Sisig',
        available: true,
        popular: true,
    },
    {
        id: 'm26',
        restaurantId: '9',
        name: 'Bangus Sisig',
        description: 'Healthier milkfish version of the classic sisig',
        price: 130,
        image: 'https://placehold.co/300x200/9ca3af/ffffff?text=Bangus+Sisig',
        category: 'Sisig',
        available: true,
    },
    {
        id: 'm27',
        restaurantId: '9',
        name: 'Sizzling Hotdog',
        description: 'Sliced hotdogs in savory sauce',
        price: 80,
        image: 'https://placehold.co/300x200/ef4444/ffffff?text=Hotdog',
        category: 'Fast Food',
        available: true,
    },

    // 3N Bakery (ID: 10)
    {
        id: 'm28',
        restaurantId: '10',
        name: 'Toasted Siopao',
        description: 'Bicol special toasted bun with meat filling (Pack of 6)',
        price: 70,
        image: 'https://placehold.co/300x200/f59e0b/ffffff?text=Toasted+Siopao',
        category: 'Pastries',
        available: true,
        popular: true,
    },
    {
        id: 'm29',
        restaurantId: '10',
        name: 'Malunggay Pandesal',
        description: 'Healthy breakfast rolls with malunggay leaves (Pack of 12)',
        price: 50,
        image: 'https://placehold.co/300x200/22c55e/ffffff?text=Pandesal',
        category: 'Bakery',
        available: true,
    },
    {
        id: 'm30',
        restaurantId: '10',
        name: 'Egg Pie',
        description: 'Classic Filipino custard pie (Slice)',
        price: 40,
        image: 'https://placehold.co/300x200/fcd34d/ffffff?text=Egg+Pie',
        category: 'Pastries',
        available: true,
    },

    // Paul Marcelle (ID: 11)
    {
        id: 'm31',
        restaurantId: '11',
        name: 'Pancit Guisado Platter',
        description: 'Stir-fried noodles good for sharing (3-4 pax)',
        price: 350,
        image: 'https://placehold.co/300x200/ea580c/ffffff?text=Pancit',
        category: 'Pancit',
        available: true,
        popular: true,
    },
    {
        id: 'm32',
        restaurantId: '11',
        name: 'Lomi Special',
        description: 'Thick egg noodle soup with generous toppings',
        price: 120,
        image: 'https://placehold.co/300x200/f59e0b/ffffff?text=Lomi',
        category: 'Noodles',
        available: true,
    },
    {
        id: 'm33',
        restaurantId: '11',
        name: 'Fried Chicken Meal',
        description: 'Fried chicken with rice and drink',
        price: 100,
        image: 'https://placehold.co/300x200/dc2626/ffffff?text=Chicken',
        category: 'Fast Food',
        available: true,
    },
];

export const getMenuByRestaurant = async (restaurantId: string): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_MENU_ITEMS.filter(item => item.restaurantId === restaurantId);
};

export const getMenuItem = async (itemId: string): Promise<MenuItem | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_MENU_ITEMS.find(item => item.id === itemId);
};

export const searchMenuItems = async (query: string): Promise<MenuItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const lowercaseQuery = query.toLowerCase();
    return MOCK_MENU_ITEMS.filter(
        item =>
            item.name.toLowerCase().includes(lowercaseQuery) ||
            item.description.toLowerCase().includes(lowercaseQuery)
    );
};
