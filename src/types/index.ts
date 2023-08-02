export type LoaderReturnType<T extends (...args: any) => any> = Awaited<ReturnType<ReturnType<T>>>;
