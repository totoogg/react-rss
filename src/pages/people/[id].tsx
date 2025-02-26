import { useRouter } from 'next/router';

export default function User() {
  const { query } = useRouter();
  return <h1>Пользователь c id {query.id}</h1>;
}
