
export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="min-h-[calc(100vh-72px)] container mx-auto ">
            <div className="min-h-[calc(100vh-72px)] flex justify-center items-center">
                <div className="w-full md:w-1/2 lg:w-1/3">
                    {children}
                </div>
            </div>
        </section>
    );
}