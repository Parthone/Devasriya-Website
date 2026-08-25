/**
 * Devasriya "D" monogram.
 *
 * The vermilion copy sits slightly off-register behind the ink copy — a nod to
 * misregistration on a printing press. Placeholder mark: swap this file when
 * the real Devasriya logo is supplied.
 */
export default function Logo({
  size = 38,
  onDark = false,
}: {
  size?: number;
  onDark?: boolean;
}) {
  const ink = onDark ? "#fbf8f3" : "#16130f";
  const counter = onDark ? "#16130f" : "#fbf8f3";

  // A capital D: outer bowl with an inner counter, drawn as one evenodd path.
  const d =
    "M16 10 H50 A40 40 0 0 1 50 90 H16 Z M30 24 V76 H49 A26 26 0 0 0 49 24 Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Devasriya"
      style={{ flex: "none" }}
    >
      {/* off-register vermilion plate */}
      <path d={d} fillRule="evenodd" fill="#d9451f" transform="translate(7 -5)" opacity="0.85" />
      {/* ink plate */}
      <path d={d} fillRule="evenodd" fill={ink} />
      {/* counter knocked back out so the two plates read cleanly */}
      <path d="M30 24 V76 H49 A26 26 0 0 0 49 24 Z" fill={counter} />
    </svg>
  );
}
