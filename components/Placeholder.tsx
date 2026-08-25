import { Fragment, type ReactNode } from "react";

/**
 * Renders a string, visually flagging any [BRACKETED] placeholder text so the
 * client can immediately see every field that still needs real information.
 *
 * Once a placeholder in config/business.ts is replaced with a real value, the
 * brackets are gone and the highlight disappears automatically.
 */
export function Txt({ children }: { children: string }): ReactNode {
  const parts = children.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <mark className="ph" key={i} title="Placeholder — replace in config/business.ts">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

/** True when a config value is still an unfilled placeholder. */
export function isPlaceholder(value: string): boolean {
  return /\[[^\]]+\]/.test(value);
}
