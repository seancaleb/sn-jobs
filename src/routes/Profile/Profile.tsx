import { User } from "@/api/auth/auth.type";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/features/auth/authSlice";

const Profile = () => {
  const user = useAppSelector(selectUser) as User;

  return (
    <section className="section-padding">
      <div className="text-4xl sm:text-5xl text-center tracking-[-1px] font-bold">
        Welcome back {user.firstName} {user.lastName}!🚀
      </div>
    </section>
  );
};

export default Profile;
