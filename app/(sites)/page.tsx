import { redirect } from "next/navigation";
import { Navbar } from "../components/common";
import { auth } from "../lib/auth";
import { Companies, Cta, Features, Hero, Testimonial } from "../components/landing-components";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect("/")
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Companies />
      <Features/>
      <Testimonial/>
      <Cta/>
    </div>
  );
}
