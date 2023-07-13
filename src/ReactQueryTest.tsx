import { QUERY_KEY, fetchPosts, useGetPosts } from "@/api/posts";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router";

/**
 * Reusable Type
 */
type LoaderReturnType<T extends (...args: any) => any> = Awaited<ReturnType<ReturnType<T>>>;

export const loader = (queryClient: QueryClient) => async () => {
  return queryClient.ensureQueryData({ queryKey: QUERY_KEY, queryFn: fetchPosts });
};

const ReactQueryTest = () => {
  const initialData = useLoaderData() as LoaderReturnType<typeof loader>;
  const { data, isError, isLoading } = useGetPosts({ initialData });

  return (
    <section className="py-32">
      <div className="max-w-xs w-full mx-auto border border-slate-200 p-8 rounded-sm">
        <div className="grid gap-y-2">
          <h1 className="text-3xl font-bold">Posts</h1>

          {data
            ? data.map((post) => {
                return (
                  <div key={post.id} className="p-4 rounded-sm bg-slate-200">
                    {post.title}
                  </div>
                );
              })
            : null}
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error</p>}
        </div>
      </div>
    </section>
  );
};

export default ReactQueryTest;
