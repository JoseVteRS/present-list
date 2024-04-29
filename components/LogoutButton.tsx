"use client"
import { logout } from '@/actions/logout'


export const LogoutButton = () => {
    const onClick = () => {
        logout();
      };
    return (
        <button onClick={onClick} >Cerrar sesión</button>
    )
}
