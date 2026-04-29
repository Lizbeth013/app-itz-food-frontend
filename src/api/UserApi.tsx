const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import type { User, UpdateUser} from "./types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";

//Función para crear un usuario en el backend
export function useCreateUser(){
    const { getAccessTokenSilently } = useAuth0();

    const createUserRequest = async (user:User)=>{
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + "/api/user",{
            method:'POST',
            headers: {
                Authorization: `Bearer ` + accessToken,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(user)
        });
        if(!res.ok){
            throw new Error ('Error al crear el usuario');
        }
        return res.json();
    };

    return useMutation({
        mutationFn: (user:User) => createUserRequest(user),
        onError: ()=>{
            toast.error("Error al crear el usuario");
        },
    })
}

//Función para actualizar un usuario
export function useUpdateUser(){
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();

    //Función para actualizar un usuario en el backend
    const updateUserRequest = async (formData: UpdateUser)=>{
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        if(!res.ok){
            throw new Error('Error al actualizar el usuario');
        }
        return res.json();
    }

    return useMutation({
        mutationFn: (formData: UpdateUser) => updateUserRequest(formData),
        onError: (err)=>{
            toast.error(err.message || "Error al actualizar el usuario");
        },
        onSuccess:()=>{
            toast.success('Usuario actualizado correctamente');
            queryClient.invalidateQueries({ queryKey: ['user']})
        }
    });//Fin del return
}

//Función para obtener los datos del usuario
export function useGetUser(){
    const { getAccessTokenSilently } = useAuth0();

    //Función para pedir los datos del usuario al backend
    const getUserRequest = async()=> {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(API_BASE_URL + '/api/user', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            },
        });
        if(!res.ok)
            throw new Error('Error al obtener los datos del usuario');       

        return res.json();
    };//Fin de getUserRequest

    return useQuery ({
        queryKey: ['user'],
        queryFn: getUserRequest
    });//Fin del return
}; //Fin de useGetUser