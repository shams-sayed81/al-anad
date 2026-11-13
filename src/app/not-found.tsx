import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-[#FAF8F3] text-[#0E2316] flex items-center justify-center p-6">
        <div className="text-center max-w-md flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-[#183D2B]">404</h1>
          <p className="text-sm text-[#4A5C50]">الصفحة غير موجودة · Page Not Found</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/ar"
              className="px-6 py-2.5 rounded-full bg-[#183D2B] text-[#FAF8F3] text-sm font-semibold hover:bg-[#356B48] transition-colors"
            >
              العودة للرئيسية
            </Link>
            <Link
              href="/en"
              className="px-6 py-2.5 rounded-full border border-[#183D2B]/25 text-[#183D2B] text-sm font-semibold hover:bg-[#183D2B]/5 transition-colors"
            >
              Return Home (EN)
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
