import { CircleUserRound, Menu } from "lucide-react";
import { Sheet,SheetContent,SheetDescription,SheetTitle,SheetTrigger } from "./ui/sheet";
import { Separator } from './ui/separator';
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";
import { Link } from "react-router";


export default function MobileNav() {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();

  if (isLoading) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500"/>

      </SheetTrigger>

      <SheetContent className="space-y-3">
      
        <SheetTitle>
          {isAuthenticated?(
            <span className="flex items-center font-bold gap-2 mx-4">
              <CircleUserRound className="text-orange-500"/>
            {user?.email}
            </span>
          ):(
            <span>Bienvenidos a AppITZFood.com</span>
          )}
        </SheetTitle>
        <Separator/>
        <SheetDescription className="flex flex-col gap-4">
          {
          isAuthenticated?(
           <>
           <Link to="/order-status"
                className="font-bold hover:text-orange-500">
                    Ordenes
                </Link>
           <MobileNavLinks/>
           </>
          ):(
          
            <Button onClick={()=> loginWithRedirect()}
                className="flex-1 font-bold bg-orange-500"
                > Login</Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}
