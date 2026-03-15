import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h2 className="text-4xl font-bold text-slate-900 mb-4">Not Found</h2>
      <p className="text-slate-600 mb-8">Could not find requested resource</p>
      <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
        Return Home
      </Link>
    </div>
  )
}
