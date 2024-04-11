import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <section className="min-h-[calc(100vh-72px)] container mx-auto ">
      <div className="min-h-[calc(100vh-72px)] flex justify-center items-center">
        <LoginForm />
      </div>
    </section>
  );
}