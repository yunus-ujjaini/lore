/**
 * Content validation CLI (FR-011/FR-012).
 * Usage: npm run validate  (via vite-node scripts/validate.ts)
 * Exit code 0 = dataset valid; 1 = failures reported.
 */
import { validateDataset } from '../src/validation/validate';

const result = await validateDataset();

if (result.ok) {
  console.log(
    `content: VALID — ${result.monsters.length} monsters, ${result.stories.length} stories, ${result.categories.length} categories`,
  );
  process.exit(0);
}

console.error(`content: INVALID — ${result.errors.length} error(s):`);
for (const err of result.errors) {
  const loc = err.field ? `${err.entry}.${err.field}` : err.entry;
  console.error(`  - ${loc}: ${err.message}`);
}
process.exit(1);
