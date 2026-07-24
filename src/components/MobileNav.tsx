import { navItems } from "../data/mock";

export function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-zinc-200 bg-white p-3 lg:hidden pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <a key={item.label} href="#" className={`flex flex-col items-center gap-1 ${item.active ? "text-brand-green" : "text-zinc-500"}`}>
            <Icon className="size-6" strokeWidth={2.5} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </a>
        );
      })}
    </div>
  );
}