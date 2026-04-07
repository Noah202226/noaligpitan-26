function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <div className="text-xl font-black tracking-tighter">PROTO.TYPE</div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#" className="hover:text-white transition-colors">
          ARCHIVE
        </a>
        <a href="#" className="hover:text-white transition-colors">
          PROCESS
        </a>
        <a
          href="#"
          className="hover:text-white transition-colors underline underline-offset-4 decoration-emerald-400"
        >
          CONNECT
        </a>
      </div>
      <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        System Active
      </div>
    </nav>
  );
}

export default Navbar;
