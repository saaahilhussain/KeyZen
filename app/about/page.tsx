import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — KeyZen",
  description:
    "KeyZen is a hobby open-source typing test inspired by Monkeytype.",
}

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-10 md:py-16">
      <article className="mx-auto w-full max-w-2xl space-y-6 text-muted-foreground">
        <h1 className="font-(family-name:--font-doto) text-3xl font-bold text-foreground md:text-4xl">
          About KeyZen
        </h1>
        <p className="leading-relaxed">
          KeyZen is a small side project: a clean, browser-based typing speed
          test built for practice and fun. It is{" "}
          <a
            href="https://github.com/shivabhattacharjee/KeyZen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            open source
          </a>{" "}
          and free to use or fork.
        </p>
        <p className="leading-relaxed">
          The UI and flow are heavily inspired by{" "}
          <a
            href="https://monkeytype.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-4 hover:underline"
          >
            Monkeytype
          </a>
          , a benchmark for minimal typing-test design. KeyZen is not affiliated
          with Monkeytype; it is an independent hobby implementation with its own
          stack and features.
        </p>
        <p className="leading-relaxed">
          If you spot a bug or want to improve something, issues and pull
          requests on GitHub are welcome.
        </p>

        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            Contributors:{" "}
            <a
              href="https://shiva.codes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Shiva Bhattacharjee
            </a>
          </p>
          <p>© {new Date().getFullYear()} Shiva Bhattacharjee.</p>
        </div>

        <p>
          <Link
            href="/"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            ← Back to typing test
          </Link>
        </p>
      </article>
    </main>
  )
}
