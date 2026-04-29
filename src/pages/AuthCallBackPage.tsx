import {useCreateUser} from '@/api/UserApi'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallBackPage() {
    const navigate= useNavigate();
    const {user}=useAuth0();
    const createUseRequest=useCreateUser();
    const hasCreateUser=useRef(false);


    useEffect(()=>{
        if(user?.sub && user?.email && !hasCreateUser.current){
            createUseRequest.mutate(
                {auth0Id:user.sub, email:user.email},
                { onSettled: () => navigate('/') }
            );
            hasCreateUser.current=true;
        } else if(!user?.sub){
            navigate('/');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createUseRequest, navigate]) 
  return (
    <div>Loading...</div>
  )
}
