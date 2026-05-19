import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

export default function MenuSection() {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems",
    });

    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Menu</h2>
                <FormDescription>
                    Crea tu menu, y asigna a cada item un nombre y precio
                </FormDescription>
            </div>
            <FormField
                control={control}
                name="menuItems"
                render={() => (
                    <FormItem className="flex flex-col gap-2">
                        {fields.map((_, index) => (
                            <MenuItemInput
                                key={index}
                                index={index}
                                removerMenuItem={() => remove(index)}
                            />
                        ))}
                    </FormItem>
                )}
            />
            <Button
                type="button"
                onClick={() => append({ name: "", price: "" })}
            >
                Agregar al menú
            </Button>
        </div>
    );
}
