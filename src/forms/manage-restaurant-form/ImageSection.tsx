import { FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { restaurantFromData } from './ManageRestaurantForm';
import {AspectRatio} from "@/components/ui/aspect-ratio";

export default function ImageSection() {
    const {control, watch} = useFormContext<restaurantFromData>()
    const existingImageUrl = watch("imagenUrl")
  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Imagen</h2>
            <FormDescription className="m-2">
                Agregue una imagen que se mostrara en la seccion 
                de busqueda del listado de restaurantes. 
                Agregar una imagen sustituye una existente.
            </FormDescription>
        </div>
        <div className="flex flex-col gap-8 w-[50%]">
            {existingImageUrl && (
                <AspectRatio ratio={16 / 9}>
                    <img src={existingImageUrl} className="rounded-md object-cover h-full w-full" />
                </AspectRatio>
            )}
            <FormField
            control={control}
            name="imagenFile"
            render={
                ({field})=> (
                    <FormItem>
                        <FormControl>
                            <Input
                            className="bg-white"
                            type="file"
                            accept=".jpg, .jpeg, .png, .webp"
                            onChange={(event)=>
                                field.onChange(
                                    event.target.files ? event.target.files[0] : null
                                )
                            }
                            />
                        </FormControl>
                    </FormItem>
                )
            }
        />
            </div>
    </div>
  )
}
