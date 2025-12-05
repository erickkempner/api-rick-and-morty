export default defineAppConfig({
  ui: {
    primary: 'cyan',
    pagination: {
      slots: {
        root: 'text-white',
        list: 'flex gap-2',
        ellipsis: 'pointer-events-none flex items-center',
        label: 'text-base',
        first: 'cursor-pointer h-12 min-w-12 border border-cyan-700 hover:border-cyan-500 rounded-full flex items-center justify-center data-[selected=true]:bg-cyan-400 data-[selected=true]:font-bold data-[selected=true]:border-cyan-400',
        prev: 'cursor-pointer h-12 min-w-12 border border-cyan-700 hover:border-cyan-500 rounded-full flex items-center justify-center data-[selected=true]:bg-cyan-400 data-[selected=true]:font-bold data-[selected=true]:border-cyan-400',
        item: 'cursor-pointer h-12 min-w-12 border border-cyan-700 hover:border-cyan-500 rounded-full flex items-center justify-center data-[selected=true]:bg-cyan-400 data-[selected=true]:font-bold data-[selected=true]:border-cyan-400',
        next: 'cursor-pointer h-12 min-w-12 border border-cyan-700 hover:border-cyan-500 rounded-full flex items-center justify-center data-[selected=true]:bg-cyan-400 data-[selected=true]:font-bold data-[selected=true]:border-cyan-400',
        last: 'cursor-pointer h-12 min-w-12 border border-cyan-700 hover:border-cyan-500 rounded-full flex items-center justify-center data-[selected=true]:bg-cyan-400 data-[selected=true]:font-bold data-[selected=true]:border-cyan-400'
      }
    }
  }
})
