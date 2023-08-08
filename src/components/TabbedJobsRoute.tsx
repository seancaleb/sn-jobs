import { Link, Outlet, useMatch } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabbedJobsRoute = () => {
  const matchIndex = useMatch("/:role/*");
  const path = matchIndex?.params["*"] || "";

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="text-3xl tracking-tight font-bold">My Jobs</div>
        <p>Manage your handpicked jobs.</p>
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

export default TabbedJobsRoute;
