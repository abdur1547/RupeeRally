import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="container space-x-5">
        <h1 className="is-typography--display">Home Page</h1>
        <Button variant="default">
          <Link href="/login">Login</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </div>
    </section>
  );
}
