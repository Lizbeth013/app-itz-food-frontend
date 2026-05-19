import ManageRestaurantFrom from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import { useCreateRestaurant, useGetRestaurante, useUpdateRestaurant } from "@/api/RestauranteApi";

export default function ManageRestaurantPage() {
  const { data: restaurante, isLoading } = useGetRestaurante();
  const { mutate: createRestaurant, isPending: isCreating } = useCreateRestaurant();
  const { mutate: updateRestaurant, isPending: isUpdating } = useUpdateRestaurant();

  const isEditing = !!restaurante;

  return (
    <ManageRestaurantFrom
      restaurante={restaurante ?? undefined}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isLoading || isCreating || isUpdating}
    />
  )
}
