import { useTranslation } from "react-i18next";
import { ChevronDown, Globe } from "lucide-react";
import type { SupportedLocale } from "@/i18n/constants";
import { isSupportedLocale, SUPPORTED_LOCALES } from "@/i18n/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeOrder: SupportedLocale[] = [...SUPPORTED_LOCALES];

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const raw = (i18n.resolvedLanguage || i18n.language || "cs").split("-")[0];
  const current: SupportedLocale = isSupportedLocale(raw) ? raw : "cs";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground h-9 px-2 md:px-3"
          aria-label={t("languages.chooser")}
        >
          <Globe className="h-4 w-4 shrink-0" aria-hidden />
          <span className="hidden sm:inline text-sm font-medium">{t(`languages.${current}`)}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]">
        <DropdownMenuRadioGroup
          value={current}
          onValueChange={(v) => void i18n.changeLanguage(v as SupportedLocale)}
          aria-label={t("languages.label")}
        >
          {localeOrder.map((code) => (
            <DropdownMenuRadioItem key={code} value={code}>
              {t(`languages.${code}`)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
