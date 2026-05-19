import {z} from 'zod';
import { formSchema } from './RestaurantFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import type { Restaurante } from '@/api/types';
import { useEffect } from 'react';



type Props = {
    restaurante?:Restaurante
    onSave: (restaurantFromData: FormData) => void;
    isLoading: boolean;
}
export type restaurantFromData = z.infer<typeof formSchema>;


export default function ManageRestaurantFrom({ onSave, isLoading, restaurante }: Props) {
    const form = useForm<restaurantFromData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            restaurantName: "",
            city: "Zacatecas",
            country: "México",
            deliveryPrice: 100,
            estimatedDeliveryTime: 30,
            cuisines: [],
            menuItems: [{ name: "", price: 0.00 }],
            imagenUrl: ""
        }
    })
    useEffect(() => {
        if (!restaurante) return;

        const updateRestaurante = {
            restaurantName: restaurante.restauranteName,
            city: restaurante.city,
            country: restaurante.country,
            deliveryPrice: restaurante.deliveryPrice / 100,
            estimatedDeliveryTime: restaurante.estimatedDeliveryTime,
            cuisines: restaurante.cuisines,
            menuItems: restaurante.menuItems,
            imagenUrl: restaurante.imageUrl,
        };

        form.reset(updateRestaurante);
    }, [restaurante]);
    const onSubmit=(formDataJson: restaurantFromData) => {
        //onSave(data);
        const formData = new FormData();
        formData.append("restauranteName", formDataJson.restaurantName);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliveryPrice", (formDataJson.deliveryPrice * 100).toString());
        formData.append("estimatedDeliveryTime", formDataJson.estimatedDeliveryTime.toString());

        formDataJson.cuisines.forEach((cuisine) => {
            formData.append("cuisines", cuisine);
        });

        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name);
            formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
        });

        if (formDataJson.imagenFile) {
            formData.append("imagenFile", formDataJson.imagenFile || "");
        }
        onSave(formData)
    }
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 bg-gray-50 p-4 md:p-10 rounded-lg'>
                <DetailsSection/>
                <Separator/>
                <CuisinesSection/>
                <Separator/>
                <MenuSection/>
                <ImageSection/>
                {
                    isLoading ? <LoadingButton/> :
                    <Button className='bg-black text-white'
                    type='submit'>Guardar</Button>
                }
        </form>
        </Form>
    )
}
