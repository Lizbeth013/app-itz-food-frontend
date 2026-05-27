import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type {CheckOutSessionRequest, CheckOutSesionResponse , Order, UpdateOrderStatusRequest} from "./types";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Hook para crear un checkout en stripe 
export function useCreateCheckOutSession(){
    const queryClient = useQueryClient();
    const {getAccessTokenSilently} = useAuth0();


    //Funcion para realizar la petición de una sesión de stripe en el backend 
    const createCheckOutSessionRequest =async (checkOutSessionRequest:CheckOutSessionRequest):Promise<any>=>{
        const acessToken = await getAccessTokenSilently();

        const res = await fetch(API_BASE_URL + '/api/order/create-checkout-session',
            {
                method:'POST',
                headers:{
                    authorization:`Bearer ${acessToken}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(checkOutSessionRequest)
            });
            if(!res.ok){
                throw new Error('Error al crear la sesion de checkout de stripe');
            }
            return res.json();
    }
    return useMutation<CheckOutSesionResponse,Error,CheckOutSessionRequest>({
        mutationFn:(checkOutSessionRequest:CheckOutSessionRequest)=>createCheckOutSessionRequest(checkOutSessionRequest),
        onError:(err)=>{
            toast.error('Error al crear la sesión de checkout en stripe');
            console.error(err);
            throw new Error ('Error al crear la sesión de checkout en stripe')
        },
        onSuccess: (order)=>{
            toast.success('Sesión de checkout en stripe creada correctamente');
            console.log(order);
            queryClient.invalidateQueries({queryKey:['order']})
        }
    })
}
//Hook para obtener las ordenes de un usuario del backend 

export function useGetOrders(){
    const {getAccessTokenSilently} = useAuth0();
    //Funcion para obtener las ordenes de un usuario de backend 
    const getOrdersRequest = async ():Promise<Order[]>=>{
        const acessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/order',{
            headers:{
                authorization:'Bearer '+ acessToken,
                'Content-Type':'application/json'
            }
        });
        if(!res.ok){
            throw new Error('Error al obtener los datos del restaurante');
        }
        return res.json();
    }
   return useQuery({
    queryKey:['orders'],
    queryFn:getOrdersRequest,
   })
}
//Hook para obtener todas las ordenes de un restaurante del backend
export function useGetRestaurantOrders(){
    const {getAccessTokenSilently} = useAuth0();

    //Función para obtener las ordenes de un restaurante del backend 
    const getRestaurantOrdersRequest = async ():Promise<Order[]>=>{
        const accessToken = await getAccessTokenSilently();
        const res=await fetch(API_BASE_URL + '/api/order',{
            method: 'GET',
            headers:{
                authorization:'Bearer '+ accessToken,
                'Content-Type':'application/json'
            }
        });
        if(!res.ok)
            throw new Error('Error al obtener los datos del restaurante');
        return res.json();
};//Fin de getRestaurantOrdersRequest
return useQuery<Order[], Error>({
    queryKey:['orders'],
    queryFn:()=>getRestaurantOrdersRequest(),
    refetchInterval: 5000
});//Fin de return
};//Fin de useGetRestaurantOrders

//Hook para actualizar el status de una orden 
export function useUpdateRestauranteOrder() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    const updateRestauranteOrderRequest = async (updateOrderStatusRequest: UpdateOrderStatusRequest): Promise<any> => {
        const accessToken = await getAccessTokenSilently();
        const url = API_BASE_URL
            + '/api/order/'
            + updateOrderStatusRequest.orderId
            + '/status';

        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: updateOrderStatusRequest.status })
        });

        if (!res.ok) {
            throw new Error('Error al actualizar el status de la orden');
        }
        return res.json();
    };

    return useMutation<Order, Error, UpdateOrderStatusRequest>({
        mutationFn: updateRestauranteOrderRequest,
        onError: (err) =>{
            console.log(err);
            toast.error(err.toString());
            throw new Error('Error al actualizar el Restaurante');
        },
        onSuccess: () => {
            toast.success('Orden del restaurante actualizada');
            queryClient.invalidateQueries({ queryKey: ['restaurante'] });
        }
    });
}
