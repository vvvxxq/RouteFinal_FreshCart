
import { ShippingAddress } from "./shipping-address";

export interface Allorders {
    cartItems:any[];
    isDelivered:boolean;
    isPaid:boolean;
    paymentMethodType:string;
    shippingAddress:ShippingAddress;
    totalOrderPrice:number;
}
