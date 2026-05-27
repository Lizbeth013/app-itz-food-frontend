export type User={
    auth0Id:string;
    email:string;
}
export type UpdateUser={
    name:string;
    address:string,
    city:string;
    country:string
}
export type BackEndUser={
    _id: string;
    email:string;
    name:string;
    address:string;
    city:string;
    country:string
}
export type MenuItem={
    _id: string;
    name: string;
    price: number;
}
export type Restaurante={
    _id: string;
    user: string;
    restauranteName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
}
export type RestauranteSearchResponse = {
    data: Restaurante[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}
export type CartItem={
    _id: string;
    name: string;
    price: number;
    quantity: number;
};
export type CheckOutSessionRequest ={
    cartItems:{
        menuItemId:string;
        name:string;
        quantity:string;
    }[];
    deliveryDetails:{
        email:string;
        name:string;
        address:string;
        city:string;
        country:string;
    };
    restaurantId:string;
    }
    export type CheckOutSesionResponse={
        url:string
    }
    export type OrderStatus= | "placed"
                             | "confirmed"        
                             | "paid" 
                             | "inProgress" 
                             | "outForDelivery" 
                             | "delivered";
export type Order={
    _id: string;
    restaurant: Restaurante;
    user: string;
    deliveryDetails: {
        name: string;
        address: string;
        city: string;
        country: string;
        email: string;
    };
    cartItems:{
        menuItemId: string;
        name: string;
        quantity: number;
    }[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: string;
    }
    export type OrderStatusInfo={
        label:string;
        value:string;
        progressValue:number;
    }
    export type UpdateOrderStatusRequest={
        orderId:string;
        status:string;
    }