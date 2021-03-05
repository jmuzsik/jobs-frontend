import Link from "next/link";

export default function LinkWrapper({ slug, className, children }) {
  return (
    <Link href={slug}>
      <a className={className}>{children}</a>
    </Link>
  );
}
