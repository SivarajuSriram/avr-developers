import {
  FacebookLogo,
  InstagramLogo,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

const SOCIALS = [
  { key: "facebook", Icon: FacebookLogo },
  { key: "instagram", Icon: InstagramLogo },
  { key: "x", Icon: XLogo },
  { key: "youtube", Icon: YoutubeLogo },
] as const;

export function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      {SOCIALS.map(({ key, Icon }) => (
        <a
          key={key}
          href={site.socials[key]}
          aria-label={key}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-9 place-items-center rounded-full text-white/60 transition-all duration-300 lg:hover:-translate-y-0.5 lg:hover:scale-110 lg:hover:text-white"
        >
          <Icon size={19} weight="regular" />
        </a>
      ))}
    </div>
  );
}
