import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            PPR + Cache Components Demo
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Ejemplo de caching de páginas dinámicas con query params usando{" "}
            <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">use cache</code>.
          </p>

          {/* Enlaces a productos de ejemplo */}
          <div className="w-full mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <h2 className="font-semibold mb-3 text-black dark:text-white">Productos de ejemplo:</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/p/women/pants/dress-pants_87081511?c=92"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  👖 Straight mid-rise pants (Beige)
                </Link>
              </li>
              <li>
                <Link 
                  href="/p/women/pants/dress-pants_87081511?c=99"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  👖 Straight mid-rise pants (Black)
                </Link>
              </li>
              <li>
                <Link 
                  href="/p/women/pants/dress-pants_87081511?c=05"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  👖 Straight mid-rise pants (Navy)
                </Link>
              </li>
            </ul>
            <p className="mt-3 text-sm text-zinc-500">
              Cada <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">?c=XX</code> tiene su propio cache entry.
            </p>
          </div>


        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
