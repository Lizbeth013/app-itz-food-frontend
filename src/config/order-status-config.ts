import type { OrderStatusInfo } from "../api/types";

export const ORDER_STATUS: OrderStatusInfo[]=[
    {label:"Recibida", value:"placed", progressValue:0},
    {label:"Esperando confirmación del restaurante", value:"paid", progressValue:25},
    {label:"En proceso", value:"inProgress", progressValue:50},
    {label:"En reparto", value:"outForDelivery", progressValue:75},
    {label:"Enntregada", value:"delivered", progressValue:100},
]