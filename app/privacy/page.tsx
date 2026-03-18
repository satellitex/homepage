export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-slate-100">
      <h1 className="font-display text-4xl">プライバシーポリシー</h1>
      <p className="mt-6 text-sm leading-relaxed text-slate-300">
        PUBLIC下線合同会社は、お問い合わせ時に取得した氏名・連絡先・ご相談内容を、
        業務連絡および支援提案の目的で利用します。法令に基づく場合を除き、本人の同意なく第三者へ提供しません。
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        個人情報の開示・訂正・削除のご相談は、
        <a href="mailto:public.company.sate@gmail.com" className="text-cyan-300 hover:underline">
          public.company.sate@gmail.com
        </a>
        までご連絡ください。
      </p>
      <a href="/" className="mt-8 inline-block text-cyan-300 hover:underline">
        トップページへ戻る
      </a>
    </main>
  )
}
