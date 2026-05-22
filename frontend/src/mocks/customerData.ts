import type { OrderPreview, RestaurantDetails } from '../types/customer'

export const restaurants: RestaurantDetails[] = [
  {
    id: 'res-1',
    name: 'Urban Spice Kitchen',
    catalog: 'Sri Lankan & Fusion',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: '$1.99',
    heroImage:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Flavor-packed bowls, kottu, and signature grilled specials.',
    about:
      'Urban Spice Kitchen blends local flavors with modern plating for everyday meals and family sharing.',
    categories: ['Rice & Curry', 'Kottu', 'Grill', 'Beverages'],
    menu: [
      {
        id: 'm-101',
        name: 'Signature Chicken Kottu',
        description: 'Street-style chopped roti with chicken, egg, and house gravy.',
        price: 9.5,
        isPopular: true,
        tags: ['Best Seller'],
      },
      {
        id: 'm-102',
        name: 'Spicy Seafood Rice Bowl',
        description: 'Prawn, calamari, sambal rice, pickled onion.',
        price: 12.0,
        tags: ['Chef Pick'],
      },
      {
        id: 'm-103',
        name: 'Lime Mint Cooler',
        description: 'Fresh lime, mint, and sparkling soda.',
        price: 2.9,
      },
    ],
  },
  {
    id: 'res-2',
    name: 'Napoli Byte Pizza',
    catalog: 'Pizza & Italian',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: '$2.49',
    heroImage:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Stone-baked pizzas, garlic breads, and creamy pastas.',
    about:
      'Napoli Byte serves authentic thin-crust pizzas with premium toppings and slow-fermented dough.',
    categories: ['Pizza', 'Pasta', 'Sides'],
    menu: [
      {
        id: 'm-201',
        name: 'Truffle Mushroom Pizza',
        description: 'Mushroom medley, mozzarella, truffle cream.',
        price: 13.5,
        isPopular: true,
      },
      {
        id: 'm-202',
        name: 'Smoked Chicken Alfredo',
        description: 'Penne pasta in creamy parmesan sauce.',
        price: 11.0,
      },
      {
        id: 'm-203',
        name: 'Garlic Bread Supreme',
        description: 'Toasted baguette with garlic butter and herbs.',
        price: 4.5,
      },
    ],
  },
  {
    id: 'res-3',
    name: 'Green Fork House',
    catalog: 'Healthy & Salads',
    rating: 4.8,
    deliveryTime: '15-25 min',
    deliveryFee: '$0.99',
    heroImage:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    shortDescription: 'Protein bowls, detox smoothies, and clean comfort food.',
    about:
      'Green Fork House offers nutrition-focused meals designed for busy professionals and fitness enthusiasts.',
    categories: ['Bowls', 'Smoothies', 'Vegan'],
    menu: [
      {
        id: 'm-301',
        name: 'Power Protein Bowl',
        description: 'Grilled chicken, quinoa, kale, avocado, sesame dressing.',
        price: 10.9,
        isPopular: true,
      },
      {
        id: 'm-302',
        name: 'Vegan Crunch Wrap',
        description: 'Tofu, beans, salsa, greens in toasted tortilla.',
        price: 8.4,
      },
      {
        id: 'm-303',
        name: 'Berry Detox Smoothie',
        description: 'Blueberry, banana, chia, almond milk.',
        price: 4.2,
      },
    ],
  },
]

export const recentOrders: OrderPreview[] = [
  {
    id: '#ORD-1092',
    restaurantName: 'Urban Spice Kitchen',
    total: 24.4,
    status: 'On the way',
    placedAt: 'Today, 12:30 PM',
  },
  {
    id: '#ORD-1085',
    restaurantName: 'Green Fork House',
    total: 14.1,
    status: 'Delivered',
    placedAt: 'Yesterday, 08:15 PM',
  },
  {
    id: '#ORD-1081',
    restaurantName: 'Napoli Byte Pizza',
    total: 19.9,
    status: 'Delivered',
    placedAt: 'Yesterday, 01:05 PM',
  },
]
