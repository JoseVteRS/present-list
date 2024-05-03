"use client"
import { logout } from '@/server/actions/logout'


export const LogoutButton = () => {
    const onClick = () => {
        logout();
      };
    return (
        <button onClick={onClick} >Cerrar sesión</button>
    )
}
