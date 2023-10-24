import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1> Skaarf's Page </h1>
      <Link className="link" href="/statgen">Statgen</Link>
    </>
  );
}
