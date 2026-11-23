# Final Datheon Internship Submission Report

**Developer:** Gloria Beneth Mbilinyi

**Institution:** Dar es Salaam Institute of Technology (DIT)

**Internship:** Datheon Full Stack Web Development Internship — Batch 01

**Prepared:** 23 November 2026, Africa/Nairobi; machine-readable evidence uses UTC timestamps

**Final repository:** https://github.com/gloria-mbilinyi/Datheon_Full_Stack_Web_Development_Internship

**Owner:** gloria-mbilinyi · **Visibility:** Public · **Branch:** main

[Developer GitHub](https://github.com/gloria-mbilinyi) · [LinkedIn](https://www.linkedin.com/in/gloria-mbilinyi/) · [Root README](../README.md)

## Submission scope and source provenance

The four completed applications are included as real, independently runnable source trees. Each task includes its README, source modules/components, assets, package manifest and lockfile, available tests, development scripts, and original workflow files. This is source consolidation rather than a replacement deployment or combined runtime.

| Task | Imported directory | Original repository | Verified source commit | Deployment |
| --- | --- | --- | --- | --- |
| 1 | [Task-1-Developer-Portfolio](../Task-1-Developer-Portfolio/) | [gloria-portfolio](https://github.com/gloria-mbilinyi/gloria-portfolio) | [`9b17eef44ad81ea6e3ed78181e3af66cf710a4ad`](https://github.com/gloria-mbilinyi/gloria-portfolio/commit/9b17eef44ad81ea6e3ed78181e3af66cf710a4ad) | [Live demo](https://gloria-mbilinyi-gloria-portfolio.gloria-portfolio-tz.workers.dev/) |
| 2 | [Task-2-Dynamic-Task-Manager](../Task-2-Dynamic-Task-Manager/) | [taskflow-datheon](https://github.com/gloria-mbilinyi/taskflow-datheon) | [`3b4eafbfd6861af5fca0b3e282e090aac5bbd416`](https://github.com/gloria-mbilinyi/taskflow-datheon/commit/3b4eafbfd6861af5fca0b3e282e090aac5bbd416) | [Live demo](https://gloria-mbilinyi.github.io/taskflow-datheon/) |
| 3 | [Task-3-Weather-Forecast](../Task-3-Weather-Forecast/) | [skycast-datheon](https://github.com/gloria-mbilinyi/skycast-datheon) | [`45cae97fa3c96e83c755bbf9161bab1ca25e6379`](https://github.com/gloria-mbilinyi/skycast-datheon/commit/45cae97fa3c96e83c755bbf9161bab1ca25e6379) | [Live demo](https://gloria-mbilinyi.github.io/skycast-datheon/) |
| 4 | [Task-4-Ecommerce-Shopping-Cart](../Task-4-Ecommerce-Shopping-Cart/) | [cartnova-datheon](https://github.com/gloria-mbilinyi/cartnova-datheon) | [`fb84900dcef48eca915fc0d1a132f04e12e07f16`](https://github.com/gloria-mbilinyi/cartnova-datheon/commit/fb84900dcef48eca915fc0d1a132f04e12e07f16) | [Live demo](https://gloria-mbilinyi.github.io/cartnova-datheon/) |

The existing final repository's initial commit was preserved. Each original repository was cloned read-only and exported from its verified `main` commit. **251 tracked source files** are recorded in [source manifests](source-manifests/), with SHA-256 hashes for original blobs and imported files. Only UTF-8 CRLF-to-LF normalization was applied; there are no application-code changes in the imported trees.

The final repository contains genuine assembly, testing, and documentation commits. It does **not** claim to reproduce every original development commit. Original histories and deployments remain independently accessible, and no original repository was modified, deleted, force-pushed, or redeployed during assembly.

## Completed tasks, technologies and behavior

| Task | Problem addressed | Implemented features | Technology |
| --- | --- | --- | --- |
| 1 · Developer Portfolio | Make the developer's technical background and work accessible to reviewers | Personal introduction, nine project entries, category filters and detail dialogs, skills, education/experience, CV, contact actions, theme and mobile navigation | React 19, TypeScript, TanStack Start/Router, Vite 8, Tailwind CSS 4, Motion, React Hook Form/Zod, Nitro; Cloudflare Workers |
| 2 · TaskFlow | Keep tasks, due dates and completion progress organized in a persistent local workspace | Complete task CRUD, completion/reopening, categories, due dates, combined search/status/category filters, ordering, statistics, localStorage recovery, accessible responsive themes | HTML5, CSS3, vanilla JavaScript modules, localStorage, Node.js, Playwright, axe-core; GitHub Pages |
| 3 · SkyCast | Select the intended city and interpret fresh weather versus missing or stale data | Live city lookup, explicit selection, current model estimates, five daily cards, temperature chart, unit switching, weather themes, recents, labeled stale cache, abort/timeout/retry handling | HTML5, CSS3, vanilla JavaScript, Fetch, Open-Meteo/GeoNames, localStorage, Node.js, Playwright, axe-core; GitHub Pages |
| 4 · CartNova | Browse a live catalog and retain consistent bag quantities and totals | Validated live products/ratings/prices, category/search/sort composition, details, persistent drawer, quantity rules, integer-cent totals, demo checkout/confirmation, cross-tab/error/image handling | HTML5, CSS3, vanilla JavaScript modules, FakeStoreAPI, localStorage, Node.js, Playwright, axe-core; GitHub Pages |

## Verification rerun inside the consolidated folders

These are newly executed results from the imported directories. They are separate from claims and captures retained in each original README.

| Project | Source-quality checks | Unit/HTTP/content tests | Browser rerun | Production build |
| --- | --- | --- | --- | --- |
| Portfolio | TypeScript, ESLint and Prettier passed | Existing content, metadata, links and CV assertion script passed; no numeric test count invented | Supplementary Playwright checks passed against the imported local preview for nine projects, theme, filters, detail dialog, CV and mobile navigation | Passed |
| TaskFlow | Passed | 28 passed | 20 original Playwright tests passed | Passed |
| SkyCast | Passed | 34 passed | 23 original Playwright tests passed | Passed |
| CartNova | Passed | 40 passed | 31 original Playwright tests passed | Passed |

Totals for the three vanilla applications: **102 unit/HTTP tests and 74 browser tests passed**. Portfolio additionally passed its custom assertion suite and supplementary UI checks. The original suites cover responsive widths, storage behavior, accessibility rules, error states and safe rendering as documented in their task READMEs.

Evidence: [local command results](evidence/local-tests.json), [portfolio supplementary checks](evidence/portfolio-local-browser.json), [integrity results](evidence/integrity.json).

### Browser environment limitation and adaptation

Default Chrome startup failed in the Windows sandbox's crash-reporting helper before assertions. The original portfolio CDP script therefore did not pass in this rerun. Supplementary Playwright portfolio checks passed instead and are explicitly identified as such.

The three original vanilla Playwright suites passed with all original assertions unchanged using the [Windows launch adapter](../scripts/windows-playwright.config.mjs), which disables the crashpad helper and permits separately managed loopback previews. No tests were skipped or weakened for these reported counts. The normal original configs are preserved. Linux CI runs their standard `npm run test:all` without this adapter.

## Independent live demo and API checks

All four supplied HTTPS demos returned **HTTP 200**, loaded their expected application, passed 1440px and 390px overflow checks, and produced no observed JavaScript runtime errors in the checked flows. These checks used **no mocked API responses**.

- Portfolio: nine projects, a working PDF CV response, theme switching, filtering, details and mobile navigation were checked on the public site.
- TaskFlow: the live initial workspace and both viewport layouts were checked; its full CRUD/storage suite was run against the imported local source.
- SkyCast: live geocoding and forecast responses returned HTTP 200, five forecast cards rendered, and the displayed temperature matched the actual API response.
- CartNova: the real product endpoint returned HTTP 200 and 20 products rendered. The full cart/checkout regression suite was independently rerun against imported source; original production checkout evidence remains within that task's documentation.

See [live evidence](evidence/live-demos.json) and [desktop/mobile screenshots](screenshots/). Captures are from actual deployed applications, rather than mockups. Preserved original screenshots are separately retained in the task directories.

## CI/CD evidence and deployment information

Original-project workflow evidence was rechecked at the pinned source commits:

| Project | Original workflow | Verified status |
| --- | --- | --- |
| Task 1 | [Portfolio quality checks](https://github.com/gloria-mbilinyi/gloria-portfolio/actions/runs/45071768269) | success at pinned source SHA |
| Task 2 | [Verify and deploy TaskFlow](https://github.com/gloria-mbilinyi/taskflow-datheon/actions/runs/45113177904) | success at pinned source SHA |
| Task 3 | [Verify and deploy SkyCast](https://github.com/gloria-mbilinyi/skycast-datheon/actions/runs/45121732097) | success at pinned source SHA |
| Task 4 | [Verify and deploy CartNova](https://github.com/gloria-mbilinyi/cartnova-datheon/actions/runs/45127728445) | success at pinned source SHA |

The consolidated [verification workflow](../.github/workflows/verify.yml) provides one clean-checkout integrity job and four independent project jobs. Each installs from its own lockfile, runs source checks/tests and builds; the three vanilla jobs also run their full deterministic Chromium suites. Portfolio CI runs its complete source-quality suite and build.

A complete consolidated workflow passed for commit `97a3a86bf0a8167474ea21d24f7958da61ff27b7`: [successful five-job verification](https://github.com/gloria-mbilinyi/Datheon_Full_Stack_Web_Development_Internship/actions/runs/45131696577). Subsequent documentation/evidence commits trigger the same checks; the latest run is available from the [repository Actions page](https://github.com/gloria-mbilinyi/Datheon_Full_Stack_Web_Development_Internship/actions). Final `main` status is verified after the report push and recorded in the delivery response.

The root workflow is read-only and does not deploy over the original sites. Portfolio remains on Cloudflare Workers; TaskFlow, SkyCast and CartNova remain on free GitHub Pages. Imported workflow files under task directories are retained as documentation, rather than active root workflows.

## Integrity, links and exclusions

- All four complete source directories and task READMEs are present.
- Source file hashes match the declared normalized imports; original blob hashes remain available.
- Package manifests and lockfiles are present for all four projects.
- Static HTML assets, relative module references, CSS URLs and submission-document links resolve; React/TypeScript imports are also exercised by typechecking and the production build.
- All 18 GitHub URLs extracted from the task READMEs, including clone URLs, were checked successfully. Required source commit links and workflow links were checked through the GitHub API.
- The root README uses real repository-local screenshots and links to actual source folders and demos.
- No nested `.git` directory, installed dependencies, generated build caches, temporary test reports, private environment files, recognizable credentials or personal machine paths are committed.
- The intentionally public portfolio contact information and developer CV remain included as required project assets.

The root integrity checker is a scoped file/hash/reference and credential-pattern check, rather than an exhaustive security audit. A fresh public checkout and final remote verification are performed during delivery.

## Installation and repeatability

Use Node.js 24. Clone the final repository, enter the appropriate task folder, and run `npm ci`. Portfolio starts with `npm run dev`; TaskFlow and SkyCast use `npm start`; CartNova uses `npm run dev`. Local addresses and full testing commands are provided in the [root README](../README.md) and preserved task READMEs.

Run `node scripts/verify-submission.mjs` at the root for offline integrity checks. Each project remains standalone with its own manifest/lockfile; no shared application dependency installation is required. Optional consolidated live QA uses Task 4's development Playwright dependency and isolated browser contexts.

## Known limitations

External weather, product and image services can fail or change. SkyCast current weather is a model estimate, and saved results are explicitly stale. CartNova checkout is simulated with illustrative USD tax/shipping rules and no real order/payment service. Browser-local data can be cleared or blocked. Portfolio contact uses the visitor's mail client rather than an email backend. Browser checks cover Chrome/Chromium and documented viewports, rather than every browser or assistive technology. The original portfolio CDP startup limitation is recorded above.

## Final readiness checklist

- [x] Four real project source folders, assets, tests, lockfiles and preserved READMEs included.
- [x] Source repository URLs and verified commit SHAs documented.
- [x] Original histories and independently accessible deployments preserved.
- [x] Independent imported-project test/build results recorded with limitations distinguished.
- [x] Real screenshots, live API evidence, CI links and integrity tooling included.
- [x] Complete professional root README and this submission report included.
- [x] Public repository pushes and final remote source verification performed during delivery.
- [ ] Developer submits the Datheon portal form after reviewing the repository.

**Engineering submission package: ready for developer review and Datheon submission.** No portal form was submitted, and no certification or Directorate approval is claimed.
