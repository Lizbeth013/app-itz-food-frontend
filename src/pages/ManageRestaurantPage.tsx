import ManageRestaurantFrom from "@/forms/manage-restaurant-form/ManageRestaurantForm"
import { useCreateRestaurant, useGetRestaurante, useUpdateRestaurant } from "@/api/RestauranteApi";
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import OrderItemsCard from "@/components/Orders/OrderItemsCard";
import { useGetRestaurantOrders } from "@/api/orderApi";

export default function ManageRestaurantPage() {
  const createRestaurantRequest = useCreateRestaurant();
  const { data: restaurante, isLoading } = useGetRestaurante();
  const  updateRestaurantRequest = useUpdateRestaurant();
  const { data:orders} = useGetRestaurantOrders();

  const isEditing = !!restaurante;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger
        className="border-olive-500 hover:bg-olive-500 hover:border-gray-400 mr-2"
        value="orders">Ordenes</TabsTrigger>
        <TabsTrigger
        className="border-olive-500 hover:bg-olive-500 hover:border-gray-400 mr-2"
        value="manage-restaurant">Administrar restaurante</TabsTrigger>
      </TabsList>
      <TabsContent value="orders">
        {
          orders?.map((order)=>(
            <OrderItemsCard order={order} key={order._id} />
          ))
        }
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantFrom 
        restaurante={restaurante}
        onSave={isEditing
          ? updateRestaurantRequest.mutate
          : createRestaurantRequest.mutate

        }
        isLoading={isLoading
          || createRestaurantRequest.isPending
          || updateRestaurantRequest.isPending
        }
        />
      </TabsContent>
    </Tabs>
   /* <ManageRestaurantFrom
      restaurante={restaurante ?? undefined}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isLoading || isCreating || isUpdating}
    />
   */
  )
}
