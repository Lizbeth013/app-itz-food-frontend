import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";
import { useLocation} from 'react-router';
import LoadingButton from "../LoadingButton";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import UserProfileForm, { type UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useGetUser } from "@/api/UserApi";


type Props={
    onCheckOut: (useFormData:UserFormData)=>void;
    disabled:boolean;
}
export default function CheckOutButton({onCheckOut, disabled}:Props) {
    const{
        isAuthenticated, isLoading: isAuthLoading,
        loginWithRedirect,
    } = useAuth0();
    const { data:getUser, isLoading: isGetUserLoading}=useGetUser();

    const {pathname } = useLocation();
    const onLogin = async()=>{
        await loginWithRedirect(({
            appState: {
                returnTo: pathname
            }
        }))

    };
    if(!isAuthenticated){
        return <Button
        onClick={onLogin}
        className="bg-orange-500 flex-1">
            Inicia sesión para procesar 
        </Button>
    }
    if(isAuthLoading || !getUser || isGetUserLoading){
        return(<LoadingButton/>)
    }
  return (
<Dialog>
    <DialogTrigger render={
        <Button variant="outline" disabled={disabled}
        className="flex flex-1 bg-orange-500 text-white"
        />
    }>
        Confirmar compra
    </DialogTrigger>
    <DialogContent className="max-w-175 md:min-w[400px] bg-gray-50">
        <DialogHeader>
            <DialogTitle>Datos para el pedido</DialogTitle>
            <DialogDescription>
                Edita o confirma los datos del usuario para el pedido
            </DialogDescription>
        </DialogHeader>
        <UserProfileForm
        getUser={getUser}
        onSave={onCheckOut}
        title="Confirmar detalles de entrega"
        buttonText="Pagar"
        />
    </DialogContent>
</Dialog>
  )
}
