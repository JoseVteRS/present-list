
interface UserPageProps {
  params: {
    userId: string
  }
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <div>
      <h1>{params.userId}</h1>
    </div>
  );
}