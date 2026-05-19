import { FormField, FormMessage, FormLabel, FormItem, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import type { restaurantFromData } from './ManageRestaurantForm';

type Props = {
    index: number;
    removerMenuItem: () => void;
}

export default function MenuItemInput({ index, removerMenuItem }: Props) {
    const { control } = useFormContext<restaurantFromData>();

    return (
        <div className='flex flex-col sm:flex-row items-start sm:items-end gap-2'>
            <FormField
                control={control}
                name={`menuItems.${index}.name`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='flex items-center gap-1'>
                            Nombre
                            <FormMessage className='text-red-500' />
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder='Hamburguesa'
                                className='bg-white'
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name={`menuItems.${index}.price`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='flex items-center gap-1'>
                            Precio ($)
                            <FormMessage className='text-red-500' />
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder='99.99'
                                className='bg-white'
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <Button
                type="button"
                variant="destructive"
                onClick={removerMenuItem}>
                Eliminar
            </Button>
        </div>
    );
}
