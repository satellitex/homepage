import { techSkills } from "@/lib/content"

function Track() {
  return (
    <ul className="marquee-track gap-10 pr-10 sm:gap-16 sm:pr-16">
      {techSkills.map((skill) => (
        <li key={skill} className="flex items-center gap-10 whitespace-nowrap sm:gap-16">
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-fg-muted transition-colors duration-300 hover:text-fg sm:text-base">
            {skill}
          </span>
          <span className="h-1 w-1 rotate-45 bg-beam-azure shadow-[0_0_8px_var(--beam-azure)]" />
        </li>
      ))}
    </ul>
  )
}

/**
 * ヒーロー直下を流れる技術スタックの帯(代表者紹介の技術スキルを装飾として再掲)。
 * 本来の掲載箇所は代表者紹介のため、この帯は読み上げ対象から外す。
 */
export function SkillsMarquee() {
  return (
    <div className="relative border-y border-hairline bg-[rgba(8,11,19,0.6)] py-6" aria-hidden="true">
      <div className="marquee">
        <Track />
        <Track />
      </div>
    </div>
  )
}
