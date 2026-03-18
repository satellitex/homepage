export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-slate-100">
      <h1 className="font-display text-4xl">利用規約</h1>
      <p className="mt-6 text-sm leading-relaxed text-slate-300">
        PUBLIC下線合同会社が提供する各種支援サービスの契約条件、責任範囲、成果物の取扱いは、
        個別契約書または発注書に定めるものとします。本ページは一般的な案内であり、最終条件は個別契約を優先します。
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        サービス内容や契約条件に関する詳細は、
        <a href="mailto:public.company.sate@gmail.com" className="text-cyan-300 hover:underline">
          public.company.sate@gmail.com
        </a>
        までお問い合わせください。
      </p>
      <a href="/" className="mt-8 inline-block text-cyan-300 hover:underline">
        トップページへ戻る
      </a>
    </main>
  )
}
