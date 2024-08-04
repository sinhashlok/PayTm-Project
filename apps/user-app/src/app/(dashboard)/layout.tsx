import SidebarItem from "../../components/dashboard/SidebarItem";
import { IoHomeOutline } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { CiClock2 } from "react-icons/ci";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <div className="w-72 border-r border-slate-300 min-h-screen mr-4 pt-28">
        <div>
          <SidebarItem
            href={"/dashboard"}
            icon={<IoHomeOutline />}
            title="Home"
          />
          <SidebarItem
            href={"/transfer"}
            icon={<GrTransaction />}
            title="Transfer"
          />
          <SidebarItem
            href={"/transactions"}
            icon={<CiClock2 />}
            title="Transactions"
          />
          <SidebarItem
            href={"/p2p"}
            icon={<GrTransaction />}
            title="P2P Transfer"
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
