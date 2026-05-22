export const restaurantProfile = {
  name: 'Urban Spice Kitchen',
  catalog: 'Burgers, grills, and rice bowls',
  location: 'Colombo 03, Sri Lanka',
  status: 'Open',
  rating: 4.8,
  prepTime: '18 min',
}

export const ownerStats = [
  { label: 'Today revenue', value: 'Rs. 86,400', note: '+12% from yesterday' },
  { label: 'Active orders', value: '18', note: '6 need confirmation' },
  { label: 'Menu items', value: '42', note: '5 marked popular' },
  { label: 'Average rating', value: '4.8', note: '214 customer reviews' },
]

export const ownerOrders = [
  {
    id: '#ORD-2048',
    customer: 'Nethmi Perera',
    items: '2x Flame Grill Burger, 1x Lime Soda',
    total: 'Rs. 4,850',
    status: 'New',
    time: '2 min ago',
  },
  {
    id: '#ORD-2047',
    customer: 'Kasun Silva',
    items: '1x Chicken Rice Bowl, 1x Brownie',
    total: 'Rs. 3,250',
    status: 'Preparing',
    time: '9 min ago',
  },
  {
    id: '#ORD-2046',
    customer: 'Amani Fernando',
    items: '3x Loaded Fries, 2x Iced Tea',
    total: 'Rs. 5,100',
    status: 'Ready',
    time: '14 min ago',
  },
  {
    id: '#ORD-2045',
    customer: 'Tharindu Jayasuriya',
    items: '1x Signature Steak Sandwich',
    total: 'Rs. 2,950',
    status: 'Picked up',
    time: '22 min ago',
  },
]

export const ownerMenuItems = [
  {
    name: 'Flame Grill Burger',
    category: 'Burgers',
    price: 'Rs. 2,350',
    status: 'Available',
    orders: 38,
  },
  {
    name: 'Chicken Rice Bowl',
    category: 'Rice bowls',
    price: 'Rs. 1,850',
    status: 'Available',
    orders: 27,
  },
  {
    name: 'Loaded Fries',
    category: 'Sides',
    price: 'Rs. 1,250',
    status: 'Low stock',
    orders: 19,
  },
  {
    name: 'Chocolate Brownie',
    category: 'Desserts',
    price: 'Rs. 950',
    status: 'Unavailable',
    orders: 8,
  },
]
