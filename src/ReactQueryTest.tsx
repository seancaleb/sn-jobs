import { useGetPosts } from "@/api/posts";

const ReactQueryTest = () => {
  const { data, isError, isLoading } = useGetPosts();

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
