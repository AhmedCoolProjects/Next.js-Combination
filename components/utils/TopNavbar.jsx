import Image from "next/image";
import logo from "@as/logo.svg";
function TopNavbar() {
  return (
    <header className="flex p-4 flex-row items-center justify-between relative border-b-2 border-blue-300 mb-6">
      <div className="flex flex-row items-center justify-start relative">
        <Image src={logo} alt="logo" width={70} height={70} />
        <h1 className="ml-1 text-xl ">Ahmed Bargady</h1>
      </div>
    </header>
  );
}

export default TopNavbar;
