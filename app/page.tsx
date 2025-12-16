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
            "use cache" + Real API Demo 🍸
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Ejemplo de caching de páginas dinámicas con API pública real usando{" "}
            <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">use cache</code>.
          </p>

          {/* Enlaces a cocktails de ejemplo */}
          <div className="w-full mt-4 p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
            <h2 className="font-semibold mb-3 text-black dark:text-white">🍹 Cocktails populares:</h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/p/11007?v=classic"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  🍹 Margarita (Classic)
                </Link>
                {" • "}
                <Link 
                  href="/p/11007?v=frozen"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Frozen
                </Link>
                {" • "}
                <Link 
                  href="/p/11007?v=double"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Double
                </Link>
              </li>
              <li>
                <Link 
                  href="/p/11000?v=classic"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  🍹 Mojito (Classic)
                </Link>
                {" • "}
                <Link 
                  href="/p/11000?v=frozen"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Frozen
                </Link>
              </li>
              <li>
                <Link 
                  href="/p/17222?v=classic"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  🍹 A1
                </Link>
              </li>
            </ul>
            <p className="mt-3 text-sm text-zinc-500">
              Cada <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">?v=variant</code> tiene su propia cache entry.
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Datos desde{" "}
              <a
                href="https://www.thecocktaildb.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                TheCocktailDB API
              </a>
            </p>
          </div>

          {/* Info técnica */}
          <div className="w-full mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg border-2 border-green-300">
            <h2 className="font-semibold mb-2 text-green-900 dark:text-green-100">
              ✅ API Real Caching + Query Params
            </h2>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• <strong>Primera visita</strong>: Fetch API → log en consola</li>
              <li>• <strong>Refresca</strong>: Cache HIT → sin log, instantáneo</li>
              <li>• <strong>Cambia variant</strong> (?v=frozen): Cache MISS → nuevo fetch</li>
              <li>• <strong>Vuelve a variant</strong> anterior: Cache HIT ✅</li>
              <li>• <strong>Invalidación</strong>: POST /api/revalidate?tag=cocktail-11007</li>
            </ul>
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
