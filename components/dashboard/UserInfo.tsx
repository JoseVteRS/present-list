import { ExtendedUser } from "@/next-auth"
import { Card, CardHeader } from "../ui/card"


interface UserInterfaceProps {
    user?: ExtendedUser,
    label: string
}

const UserInfo = ({ user, label }: UserInterfaceProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <p className="text-2xl font-semibold ">
                    {label}
                </p>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        ID
                    </p>
                    <p className="truncate text-xs max-w-[1080px] font-mono p-1 bg-slate-100 rounded-sm1">
                        {user?.id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Nombre
                    </p>
                    <p className="truncate text-xs max-w-[1080px] font-mono p-1 bg-slate-100 rounded-sm1">
                        {user?.name}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Correo electronico
                    </p>
                    <p className="truncate text-xs max-w-[1080px] font-mono p-1 bg-slate-100 rounded-sm1">
                        {user?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        Role
                    </p>
                    <p className="truncate text-xs max-w-[1080px] font-mono p-1 bg-slate-100 rounded-sm1">
                        {user?.role}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">
                        2FA
                    </p>
                    <p className="truncate text-xs max-w-[1080px] font-mono p-1 bg-slate-100 rounded-sm1">
                        {user?.isTwoFactorEnabled ? "ON" : 'OFF '}
                    </p>
                </div>
            </CardHeader>
        </Card>
    )
}

export default UserInfo