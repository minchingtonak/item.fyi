import useItem from './hooks/useItem';

export function App() {
  const { item, error, loading, retry } = useItem();

  if (loading) {
    return (
      <div class="flex items-center justify-center gap-y-2 h-screen w-full bg-slate-900 text-slate-300">
        <div class="flex items-center justify-center rounded-lg border-[1px] border-slate-800 p-3 shadow-2xl w-1/2 h-1/4">
          <span class="text-slate-700 animate-bounce">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div class="flex items-center justify-center gap-y-2 h-screen w-full bg-slate-900 text-slate-300">
        <div class="flex flex-col items-center justify-center gap-y-2 rounded-lg border-[1px] border-slate-800 p-3 shadow-2xl w-1/2 h-1/4">
          <span class="text-slate-700">Something went wrong :(</span>
          <button
            class="rounded-md py-1 px-3 border-[1px] border-slate-800 text-slate-700 hover:bg-slate-800 hover:border-slate-700 hover:text-slate-600"
            onClick={retry}
          >
            click me to retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div class="flex items-center justify-center gap-y-2 h-screen w-full bg-slate-900 text-slate-300">
      <div class="flex rounded-lg border-[1px] border-slate-800 p-3 shadow-2xl w-1/2">
        <div class="flex flex-col gap-y-4 px-2 border-r-[1px] border-slate-800 w-7/12">
          <h1 class="text-2xl">{item.name}</h1>
          <p class="text-lg">{item.flavor}</p>
        </div>
        <div class="flex flex-col items-center gap-y-3 flex-grow">
          <a
            class="flex justify-center items-center p-1 m-1 border-[1px] border-slate-800 w-1/2 h-40"
            href={item.url}
          >
            <img class="object-scale-down" src={item.sprite} />
          </a>
          <div class="flex flex-col items-center gap-y-1">
            <span>From: {item.game}</span>
            <span>Category: {item.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
