import { ORDER_STATUS } from '../constants';

export interface Order {
    id: string;
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: {
        id: string;
        name: string;
        quantity: number;
        price: number;
        variant?: string;
    }[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    status: keyof typeof ORDER_STATUS;
    deliveryAddress: string;
    paymentMethod: string;
    riderId?: string;
    riderName?: string;
    createdAt: Date;
    estimatedDelivery?: Date;
}

let mockOrders: Order[] = [];

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newOrder: Order = {
        ...orderData,
        id: `ORD-${Date.now()}`,
        status: 'PENDING',
        createdAt: new Date(),
        estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    };

    mockOrders.push(newOrder);
    return newOrder;
};

export const getOrderById = async (orderId: string): Promise<Order | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockOrders.find(order => order.id === orderId);
};

export const getOrdersByCustomer = async (customerId: string): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders.filter(order => order.customerId === customerId);
};

export const getOrdersByRestaurant = async (restaurantId: string): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders.filter(order => order.restaurantId === restaurantId);
};

export const getOrdersByRider = async (riderId: string): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders.filter(order => order.riderId === riderId);
};

export const getAvailableOrders = async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders.filter(order => order.status === 'READY' && !order.riderId);
};

export const updateOrderStatus = async (
    orderId: string,
    status: keyof typeof ORDER_STATUS
): Promise<Order | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const orderIndex = mockOrders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) return undefined;

    mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        status,
    };

    return mockOrders[orderIndex];
};

export const assignRiderToOrder = async (
    orderId: string,
    riderId: string,
    riderName: string
): Promise<Order | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const orderIndex = mockOrders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) return undefined;

    mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        riderId,
        riderName,
        status: 'PICKED_UP',
    };

    return mockOrders[orderIndex];
};

// Initialize with some mock orders for testing
export const initializeMockOrders = (userId: string) => {
    mockOrders = [
        {
            id: 'ORD-001',
            customerId: userId,
            restaurantId: '1',
            restaurantName: "Bigg's Diner",
            items: [
                { id: 'm1', name: 'Bicol Express', quantity: 2, price: 150 },
                { id: 'm2', name: 'Laing', quantity: 1, price: 130 },
            ],
            subtotal: 430,
            deliveryFee: 25,
            total: 455,
            status: 'DELIVERED',
            deliveryAddress: '123 Main St, Naga City',
            paymentMethod: 'Cash',
            riderId: 'rider1',
            riderName: 'Juan Dela Cruz',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
            id: 'ORD-002',
            customerId: userId,
            restaurantId: '2',
            restaurantName: 'Bob Marlin',
            items: [
                { id: 'm5', name: 'Grilled Tuna Belly', quantity: 1, price: 280 },
            ],
            subtotal: 280,
            deliveryFee: 30,
            total: 310,
            status: 'ON_THE_WAY',
            deliveryAddress: '123 Main St, Naga City',
            paymentMethod: 'GCash',
            riderId: 'rider2',
            riderName: 'Maria Santos',
            createdAt: new Date(Date.now() - 20 * 60 * 1000),
            estimatedDelivery: new Date(Date.now() + 10 * 60 * 1000),
        },
    ];
};
