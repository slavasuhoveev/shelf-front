import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to Shelful</h1>
      <p>Build and explore your personal music collection.</p>

      <Link href="/app/album-works">
        Explore your albums
      </Link>
    </main>
  );
}
