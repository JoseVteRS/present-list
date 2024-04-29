export const DashboardSection = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <div className="mt-8">
            <h1 className="font-bold text-2xl">{title}</h1>
            {children}
        </div>
    )
}
