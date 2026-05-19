
import {z} from 'zod';

export const formSchema= z.object({
    restaurantName: z.string({
        required_error: 'El nombre del restaurante es requerido'
    }).min(1, 'El nombre del restaurante es requerido').trim(),
    city: z.string({
        required_error: 'El nombre de la ciudad es requerido'
    }).min(1, 'El nombre de la ciudad es requerido').trim(),
    country: z.string({
        required_error: 'El nombre del pais es requerido'
    }).min(1, 'El nombre del pais es requerido').trim(),
    deliveryPrice: z.coerce.number({
        required_error: 'El precio de entrega es requerido',
        invalid_type_error: 'El precio debe ser un numero valido'
    }).min(1, 'El precio de entrega debe ser mayor a 0'),
    estimatedDeliveryTime: z.coerce.number({
        required_error: 'El tiempo estimado de entrega es requerido',
        invalid_type_error: 'El tiempo estimado de entrega debe ser un numero valido'
    }).min(1, 'El tiempo estimado debe ser mayor a 0'),
    cuisines: z.array(z.string()).nonempty({
        message: 'Selecciona al menos una cocina'
    }),
    menuItems: z.array(
        z.object({
            name: z.string({required_error:'El nombre debe ser requerido'})
            .min(1, {message: 'El nombre debe tener al menos 1 caracter'}),
            price: z.coerce.number({required_error: 'El precio es requerido',
                invalid_type_error: 'El precio debe ser un numero valido'
             })
            })
    ),
    imagenFile: z.instanceof(File,{message: 'Imagen es requerida'}).optional(),
    imagenUrl: z.string().optional()

}).refine((data)=>
    data.imagenUrl || data.imagenFile,
    {
        message: 'Se debe proporrcionar un archivo de imagen o una URL de la imagen',
        path: ['imagenFile']
    
});//Fin de forrmSchema

export type RestauratFormData=z.infer<typeof formSchema>;
