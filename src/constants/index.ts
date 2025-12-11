// Sipocot Barangays (Simplified for lighter system)
export const TOWNS = [
    'Brgy. Centro',
    'Brgy. Impig',
    'Brgy. Cabuyao',
    'Brgy. Lourdes',
    'Brgy. Caranan',
    'Brgy. Malaguico',
    'Brgy. Caima',
    'Brgy. Looy',
];

// Service Types
export const SERVICES = {
    FOOD_DELIVERY: 'food_delivery',
    PARCEL_DELIVERY: 'parcel_delivery',
    RIDE_BOOKING: 'ride_booking',
} as const;

// Order Status
export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PREPARING: 'preparing',
    READY: 'ready',
    PICKED_UP: 'picked_up',
    ON_THE_WAY: 'on_the_way',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
} as const;

// Ride Types
export const RIDE_TYPES = {
    TRICYCLE: 'tricycle',
    MOTORCYCLE: 'motorcycle',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
    CASH: 'cash',
    GCASH: 'gcash',
    PAYMAYA: 'paymaya',
    CARD: 'card',
} as const;

// User Roles
export const USER_ROLES = {
    CUSTOMER: 'customer',
    VENDOR: 'vendor',
    RIDER: 'rider',
} as const;
