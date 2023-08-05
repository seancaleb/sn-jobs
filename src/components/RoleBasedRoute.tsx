import { Link, Outlet, useMatch } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RoleBasedRoute = () => {
  const matchIndex = useMatch("/:role/*");
  const path = matchIndex?.params["*"] || "";

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-6">
      <div className="space-y-1">
        <div className="text-2xl tracking-tight font-bold">My Jobs</div>
        <p className="text-[0.9375rem]">Manage your jobs.</p>
      </div>

      <Tabs value={path}>
        <TabsList>
          <TabsTrigger asChild value="bookmarked-jobs">
            <Link to="bookmarked-jobs">Bookmarked</Link>
          </TabsTrigger>
          <TabsTrigger asChild value="applied-jobs">
            <Link to="applied-jobs">Applied</Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={path}>
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoleBasedRoute;
