import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">
        <h1 className="font-mono text-3xl text-center py-5">World Ranks</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
