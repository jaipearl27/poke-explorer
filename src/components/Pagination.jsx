'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }) {
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get('page')) || 1;

  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {/* Previous Button */}
      <Link
        href={`/?page=${page - 1}`}
        className={`px-4 py-2 border rounded-lg ${
          !hasPrevPage ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
        }`}
        aria-disabled={!hasPrevPage}
      >
        ← Previous
      </Link>

      {/* Page Indicator */}
      <span className="text-lg font-semibold">
        Page {page} of {totalPages}
      </span>

      {/* Next Button */}
      <Link
        href={`/?page=${page + 1}`}
        className={`px-4 py-2 border rounded-lg ${
          !hasNextPage ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
        }`}
        aria-disabled={!hasNextPage}
      >
        Next →
      </Link>
    </div>
  );
}