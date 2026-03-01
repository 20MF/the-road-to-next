import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h2 className="text-lg">Home Page</h2>
            <Link className="underline" href='/tickets'>
                Goto Tickets
            </Link>
        </div>
    )
}
