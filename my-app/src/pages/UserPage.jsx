//Presentation Layer: các page chính (theo routing)

import { useUsers } from "../hooks/useUsers";
import UserCard from "./components/UserCard";

const UserPage = () => {
  const { users, loading } = useUsers();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserPage;
