import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, [router]);
  return (
    <div className="text-center">
      <h1>Ooooops....</h1>
      <h2>This page cannot be found.</h2>
      <p>
        Go back to the <Link href="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
