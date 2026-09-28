export const COVER_DURATION = 860;

export function initialCoverPhase(route, knownIds) {
  return route.id && knownIds.has(route.id) ? "open" : "closed";
}

export function nextCoverPhase(phase, action, reducedMotion = false) {
  if (phase === "closed" && action === "open")
    return reducedMotion ? "open" : "opening";
  if (phase === "open" && action === "close")
    return reducedMotion ? "closed" : "closing";
  if (action === "finish" && phase === "opening") return "open";
  if (action === "finish" && phase === "closing") return "closed";
  return phase;
}
