import { Header } from "@/components/header";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Header />
      <div className="flex h-[calc(100%-56px)] w-full items-center">
        <NavigationSidebar />
        <main className="h-full w-[calc(100%-272px)]">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
