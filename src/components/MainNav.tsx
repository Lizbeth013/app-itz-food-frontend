import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";

export default function MainNav() {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return null;

    return (
        <span className="flex space-x-2 items-center">
            {isAuthenticated ? (
                <UserNameMenu />
            ) : (
                <Button
                    variant="ghost"
                    className="font-bold hover:bg-white hover:text-orange-500"
                    onClick={async () => await loginWithRedirect()}
                >
                    LogIn
                </Button>
            )}
        </span>
    );
}
