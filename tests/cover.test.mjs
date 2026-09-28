import test from "node:test";
import assert from "node:assert/strict";
import {
  initialCoverPhase,
  nextCoverPhase,
  COVER_DURATION,
} from "../src/cover.mjs";

test("home starts closed while valid shared entries open directly", () => {
  const ids = new Set(["factory-harmonic-booster"]);
  assert.equal(initialCoverPhase({ id: "" }, ids), "closed");
  assert.equal(initialCoverPhase({ id: "missing" }, ids), "closed");
  assert.equal(
    initialCoverPhase({ id: "factory-harmonic-booster" }, ids),
    "open",
  );
});
test("cover opens and closes through guarded reversible transitions", () => {
  let phase = "closed";
  for (const [action, expected] of [
    ["open", "opening"],
    ["open", "opening"],
    ["close", "opening"],
    ["finish", "open"],
    ["close", "closing"],
    ["open", "closing"],
    ["finish", "closed"],
  ]) {
    phase = nextCoverPhase(phase, action);
    assert.equal(phase, expected);
  }
  assert.ok(COVER_DURATION > 0 && COVER_DURATION < 1500);
});
test("reduced motion skips both 3D transitions", () => {
  assert.equal(nextCoverPhase("closed", "open", true), "open");
  assert.equal(nextCoverPhase("open", "close", true), "closed");
});
