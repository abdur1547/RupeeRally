import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function Home() {
  return (
    <section>
      <div className="container space-x-5">
        <h1 className="is-typography--display">Home Page</h1>
        <Button variant="default">
          Click me
          <Lock />{" "}
        </Button>
        <Button variant="secondary">Click me</Button>
        <Button variant="outline">Click me</Button>
        <Button variant="link">Click me</Button>
        <Button variant="ghost">Click me</Button>
        <Button variant="destructive">Click me</Button>
      </div>
    </section>
  );
}
