import { useCreateUser } from "@/api/UserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export default function AuthCallBackPage() {
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = useAuth0();
    const createUserRequest = useCreateUser();
    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated) {
            navigate("/");
            return;
        }

        if (user?.sub && user?.email && !hasCreatedUser.current) {
            hasCreatedUser.current = true;
            createUserRequest.mutate(
                { auth0Id: user.sub, email: user.email },
                { onSettled: () => navigate("/") }
            );
            return;
        }

        navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading, isAuthenticated, user]);

    return (
        <div className="flex items-center justify-center h-screen">
            <span className="text-orange-500 text-xl font-semibold animate-pulse">Iniciando sesión...</span>
        </div>
    );
}
