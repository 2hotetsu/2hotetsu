interface HeadingSmProps {
  /** localised heading */
  title: string;
  /** decorative English line beside it — omitted when it repeats the title */
  en?: string;
}

/** Small section heading (`hm-heading-sm`) used inside the sub-pages. */
export default function HeadingSm({ title, en }: HeadingSmProps) {
  return (
    <header className="hm-heading-sm" data-reveal>
      <h2>{title}</h2>
      {en && en !== title && <span className="hm-heading-sm-en">{en}</span>}
    </header>
  );
}
