import { useTranslation } from "react-i18next";

const considerLeftKeys = ["item1", "item2", "item3"] as const;
const considerRightKeys = ["item4", "item5"] as const;

type WhenToConsiderBlockProps = {
  pageKey: string;
};

const WhenToConsiderBlock = ({ pageKey }: WhenToConsiderBlockProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl bg-secondary/70 p-6 sm:p-8 mt-2">
      <h2 className="text-lg font-semibold text-foreground mb-5">{t(`${pageKey}.whenToConsiderTitle`)}</h2>
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
        <ul className="space-y-3 list-disc list-outside pl-5 marker:text-muted-foreground">
          {considerLeftKeys.map((key) => (
            <li key={key} className="text-sm text-muted-foreground leading-relaxed">
              {t(`${pageKey}.whenToConsider.${key}`)}
            </li>
          ))}
        </ul>
        <ul className="space-y-3 list-disc list-outside pl-5 marker:text-muted-foreground">
          {considerRightKeys.map((key) => (
            <li key={key} className="text-sm text-muted-foreground leading-relaxed">
              {t(`${pageKey}.whenToConsider.${key}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhenToConsiderBlock;
