import { useRef, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NetflixRowProps {
  title: string;
  children: ReactNode;
}

export default function NetflixRow({ title, children }: NetflixRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-6">
      <h2 className="text-2xl font-semibold mb-4 px-4 sm:px-8 font-serif text-dusty-blue dark:font-tech dark:text-tron-blue">
        {title}
      </h2>

      <div className="group relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center
            bg-gradient-to-r from-beige/80 dark:from-tron-black/80 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft
            className="text-dusty-blue dark:text-tron-blue"
            size={28}
          />
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-8 scroll-smooth snap-x snap-mandatory"
        >
          {children}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-center
            bg-gradient-to-l from-beige/80 dark:from-tron-black/80 to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight
            className="text-dusty-blue dark:text-tron-blue"
            size={28}
          />
        </button>
      </div>
    </section>
  );
}
