import { readFileSync } from "node:fs"

// Keep the minimum patched release in sync with local development and CI.
const minimum = readFileSync(new URL("../.nvmrc", import.meta.url), "utf8").trim()
const [requiredMajor, requiredMinor, requiredPatch] = minimum.split(".").map(Number)
const [major, minor, patch] = process.versions.node.split(".").map(Number)
const supported =
  major === requiredMajor &&
  (minor > requiredMinor || (minor === requiredMinor && patch >= requiredPatch)) &&
  !process.versions.node.includes("-")

if (!supported) {
  console.error(
    `Node.js ${process.versions.node} is unsupported. Use Node.js ${minimum} or a later ${requiredMajor}.x release with the eMudhra CA fix (nvm install && nvm use).`,
  )
  process.exit(1)
}

console.log(`Node.js ${process.versions.node}: eMudhra minimum version check passed.`)
