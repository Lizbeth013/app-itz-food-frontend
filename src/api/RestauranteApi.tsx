import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import type { Restaurante, RestauranteSearchResponse } from "./types";
import type { SearchState } from "@/pages/SearchPage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useGetRestaurante() {
    const { getAccessTokenSilently } = useAuth0();

    const getRestauranteRequest = async (): Promise<Restaurante | null> => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 404) return null;
        if (!res.ok) {
            throw new Error('Error al obtener el restaurante')
        }
        return res.json()
    }

    return useQuery({
        queryKey: ['restaurante'],
        queryFn: getRestauranteRequest,
        retry: false
    })
}

export function useUpdateRestaurant() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    const updateRestauranteRequest = async (restaurantFormData: FormData): Promise<Restaurante> => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            body: restaurantFormData
        });
        if (!res.ok) {
            throw new Error('Error al actualizar el restaurante');
        }
        return res.json();
    };

    return useMutation({
        mutationFn: (restaurante: FormData) => updateRestauranteRequest(restaurante),
        onError: () => toast.error('Error al actualizar el restaurante'),
        onSuccess: () => {
            toast.success('Restaurante actualizado correctamente');
            queryClient.invalidateQueries({ queryKey: ['restaurante'] });
        },
    });
}

export function useCreateRestaurant() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    const createRestauranteRequest = async (restaurantFormData: FormData): Promise<Restaurante> => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/restaurante', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            body: restaurantFormData
        });
        if (!res.ok) {
            throw new Error('Error al crear el restaurante')
        }
        return res.json()
    }

    return useMutation({
        mutationFn: (restaurante: FormData) => createRestauranteRequest(restaurante),
        onError: () => toast.error("Error al crear el restaurante"),
        onSuccess: () => {
            toast.success("Restaurante creado correctamente");
            queryClient.invalidateQueries({ queryKey: ['restaurante'] });
        },
    })
}
export const useSearchRestaurantes = (searchState: SearchState, city?: string) => {
    const getSearchRestauratRequest = async (searchState:SearchState): Promise<RestauranteSearchResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedCuisines", searchState.selectedCuisines.join(","));
        params.set("sortOption", searchState.sortOptions);

        const url = API_BASE_URL + '/api/restaurante/search/' + city + '?' + params.toString();
        console.log(url);
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error('Error al buscar restaurante');
        }
        return res.json();
    };
    return useQuery({
        queryKey: ['searchRestaurante', searchState],
        queryFn: ()=> getSearchRestauratRequest(searchState),
        enabled: !!city
    });
}
 export const useGetRestaurantById =(restaurantId?:string)=>{
        const GetRestaurantByIdRequest=async(): Promise<Restaurante> =>{
            const url=API_BASE_URL
            +'/api/restaurante/'
            +restaurantId
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Errorr al obtener el Restaurante")

            }
            return response.json();
        }//Fin de getRestaurantByIdRequest
        return useQuery({
            queryKey: ['fetchRestaurant'],
            queryFn:GetRestaurantByIdRequest,
            enabled: !!restaurantId
        })
    }//Fin de useGetRestaurantById
    
