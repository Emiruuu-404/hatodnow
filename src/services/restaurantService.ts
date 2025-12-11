export interface Restaurant {
    id: string;
    name: string;
    description: string;
    image: string;
    rating: number;
    deliveryTime: string;
    deliveryFee: number;
    town: string;
    cuisine: string[];
    isOpen: boolean;
    featured: boolean;
}

export const MOCK_RESTAURANTS: Restaurant[] = [
    {
        id: '1',
        name: 'Jollibee Sipocot',
        description: 'Philippines\' favorite fast-food chain known for Chickenjoy',
        image: 'https://placehold.co/400x300/dc2626/ffffff?text=Jollibee',
        rating: 4.3,
        deliveryTime: '15-25 min',
        deliveryFee: 49,
        town: 'PCCF+FM4',
        cuisine: ['Fast Food', 'Chicken', 'Burgers'],
        isOpen: true,
        featured: true,
    },
    {
        id: '2',
        name: 'Biggs Sipocot',
        description: 'Famous Bicolano diner serving fried chicken, burgers, and pasta',
        image: 'https://placehold.co/400x300/dc2626/ffffff?text=Biggs+Diner',
        rating: 4.5,
        deliveryTime: '20-30 min',
        deliveryFee: 35,
        town: 'Zone 4A',
        cuisine: ['Bicolano', 'American', 'Fast Food'],
        isOpen: true,
        featured: true,
    },
    {
        id: '3',
        name: 'Dice \'N Brews',
        description: 'Superb coffee and absolutely delicious sandwiches',
        image: 'https://placehold.co/400x300/78350f/ffffff?text=Dice+N+Brews',
        rating: 4.6,
        deliveryTime: '20-35 min',
        deliveryFee: 25,
        town: 'Zone 4',
        cuisine: ['Cafe', 'Coffee', 'Sandwiches'],
        isOpen: true,
        featured: false,
    },
    {
        id: '4',
        name: 'Thea\'s Seafood And Grill',
        description: 'Fresh seafood and grilled specialties',
        image: 'https://placehold.co/400x300/0284c7/ffffff?text=Theas+Seafood',
        rating: 5.0,
        deliveryTime: '30-45 min',
        deliveryFee: 40,
        town: 'Telco Shops',
        cuisine: ['Seafood', 'Grill', 'Filipino'],
        isOpen: true,
        featured: true,
    },
    {
        id: '5',
        name: 'MIEKOYS SIPOCOT',
        description: 'Delicious pizza specials and pasta',
        image: 'https://placehold.co/400x300/f59e0b/ffffff?text=MIEKOYS',
        rating: 4.6,
        deliveryTime: '25-40 min',
        deliveryFee: 30,
        town: 'San Juan Ave',
        cuisine: ['Pizza', 'Italian'],
        isOpen: false,
        featured: false,
    },
    {
        id: '6',
        name: 'Jybon Chicken Inasal',
        description: 'Authentic Bacolod-style chicken inasal',
        image: 'https://placehold.co/400x300/ea580c/ffffff?text=Jybon+Inasal',
        rating: 4.4,
        deliveryTime: '20-30 min',
        deliveryFee: 20,
        town: 'QX6G+Q77',
        cuisine: ['Filipino', 'Inasal', 'Grill'],
        isOpen: true,
        featured: true,
    },
    {
        id: '7',
        name: 'Explosive Burger',
        description: 'Very good burger in price, truly explosive taste',
        image: 'https://placehold.co/400x300/b91c1c/ffffff?text=Explosive+Burger',
        rating: 4.9,
        deliveryTime: '15-25 min',
        deliveryFee: 20,
        town: 'Maharlika Highway',
        cuisine: ['Burgers', 'Fast Food'],
        isOpen: true,
        featured: true,
    },
    {
        id: '8',
        name: 'Nidas Kakanin',
        description: 'Traditional Filipino rice cakes and delicacies',
        image: 'https://placehold.co/400x300/8c6b48/ffffff?text=Nidas+Kakanin',
        rating: 5.0,
        deliveryTime: '20-40 min',
        deliveryFee: 15,
        town: 'Fabrecante St.',
        cuisine: ['Kakanin', 'Dessert', 'Filipino'],
        isOpen: true,
        featured: false,
    },
    {
        id: '9',
        name: 'Hungry Spot Sisig',
        description: 'The best spot for sizzling sisig cravings',
        image: 'https://placehold.co/400x300/d97706/ffffff?text=Hungry+Spot',
        rating: 4.5,
        deliveryTime: '20-30 min',
        deliveryFee: 25,
        town: 'QX6G+36',
        cuisine: ['Sisig', 'Filipino', 'Fast Food'],
        isOpen: true,
        featured: true,
    },
    {
        id: '10',
        name: '3N Bakery Sipocot',
        description: 'Freshly baked bread and pastries daily',
        image: 'https://placehold.co/400x300/f59e0b/ffffff?text=3N+Bakery',
        rating: 4.2,
        deliveryTime: '15-30 min',
        deliveryFee: 15,
        town: 'QXCG+4W2',
        cuisine: ['Bakery', 'Pastries'],
        isOpen: true,
        featured: false,
    },
    {
        id: '11',
        name: 'Paul Marcelle Food House',
        description: 'Specializing in pancit and short orders',
        image: 'https://placehold.co/400x300/ea580c/ffffff?text=Paul+Marcelle',
        rating: 4.5,
        deliveryTime: '25-35 min',
        deliveryFee: 25,
        town: 'QX9G+CRF',
        cuisine: ['Pancit', 'Filipino', 'Noodles'],
        isOpen: true,
        featured: false,
    },
];

export const getRestaurants = async (): Promise<Restaurant[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_RESTAURANTS;
};

export const getRestaurantById = async (id: string): Promise<Restaurant | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_RESTAURANTS.find(r => r.id === id);
};

export const getRestaurantsByTown = async (town: string): Promise<Restaurant[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_RESTAURANTS.filter(r => r.town === town);
};

export const getFeaturedRestaurants = async (): Promise<Restaurant[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_RESTAURANTS.filter(r => r.featured);
};
