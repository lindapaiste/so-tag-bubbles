import { FC, ReactNode } from "react";
import { Divider } from "./Divider";

/**
 * Creates a section to be shown on the scrolling home page.
 */

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const Section: FC<SectionProps> = ({
  title,
  subtitle,
  children,
}: SectionProps) => (
  <div className="my-16 flex flex-col items-center">
    <Divider />
    <div className="m-8 mt-16 text-center">
      <h3 className="font-lora text-3xl">{title}</h3>
      {subtitle && <h4 className="font-lora text-lg italic">{subtitle}</h4>}
    </div>
    {children}
  </div>
);
