import { useUpdateUser, useGetUser } from "@/api/UserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner";

export default function UserProfilePage() {
    const { data: user, isLoading, isError } = useGetUser();
    const updateUserRequest = useUpdateUser();

    if (isLoading)
        return <LoadingButton />;

    if (isError) {
        toast.error("Error al cargar los datos del usuario");
        return <span>Error al cargar el perfil</span>;
    }

    return (
        <UserProfileForm
            onSave={updateUserRequest.mutate}
            isLoading={updateUserRequest.isPending}
            getUser={user!}
        />
    );
}
