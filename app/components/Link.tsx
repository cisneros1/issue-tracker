/**
 * Styled Link that combines Next.js Link with a consistent underline style.
 */

import NextLink from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink
      href={href}
      className="text-primary hover:underline underline-offset-4"
    >
      {children}
    </NextLink>
  );
};

export default Link;
