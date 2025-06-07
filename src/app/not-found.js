import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex w-full h-full justify-center items-center">
            <h1 className="text-4xl">Not Found</h1>

            <Link href={'/'} className="text-blue-500 hover:text-blue-700" >Go Back to Home Page</Link>

        </div>
    )
}
