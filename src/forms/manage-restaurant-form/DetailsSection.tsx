import { FormDescription, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { restaurantFromData } from './ManageRestaurantForm';

export default function DetailsSection() {
  const { control } = useFormContext<restaurantFromData>();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Detalles</h2>
        <FormDescription>
          Detalles del restaurante
        </FormDescription>
      </div>
      <FormField control={control}
        name="restaurantName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input {...field} className="bg-white"/>
            </FormControl>
            <FormMessage className='text-red-500'/>
          </FormItem>
        )}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <FormField control={control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Ciudad</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white"/>
              </FormControl>
              <FormMessage className='text-red-500'/>
            </FormItem>
          )}
        />
        <FormField control={control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Pais</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white"/>
              </FormControl>
              <FormMessage className='text-red-500'/>
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <FormField control={control}
          name="deliveryPrice"
          render={({ field }) => (
            <FormItem className="w-full md:max-w-[25%]">
              <FormLabel>Precio de entrega ($ pesos)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="100.00"/>
              </FormControl>
              <FormMessage className='text-red-500'/>
            </FormItem>
          )}
        />
        <FormField control={control}
          name="estimatedDeliveryTime"
          render={({ field }) => (
            <FormItem className="w-full md:max-w-[50%]">
              <FormLabel>Tiempo estimado de entrega (minutos)</FormLabel>
              <FormControl>
                <Input {...field} className="bg-white" placeholder="30"/>
              </FormControl>
              <FormMessage className='text-red-500'/>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
