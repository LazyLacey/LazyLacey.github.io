# Changelog

## [1.9.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.8.0...v1.9.0) (2026-06-08)


### Features

* add German card pack (1517 cards, 45 groups) ([2d495d2](https://github.com/LazyLacey/LazyLacey.github.io/commit/2d495d211e0019167094c84ecf79a831f1f8a3f9))
* add Korean card pack (1406 cards, 45 groups) ([0aac29a](https://github.com/LazyLacey/LazyLacey.github.io/commit/0aac29acb24cbe8ad75c5b4fee26195f997e145e))

## [1.8.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.7.0...v1.8.0) (2026-06-07)


### Features

* add verb packs for DE/IT/FR and standardize all packs to 20 verbs ([1722257](https://github.com/LazyLacey/LazyLacey.github.io/commit/17222570161852b389dba693104538df7acbbaca))
* hide verb trainer tab for languages without verbTrainer flag ([3024a9e](https://github.com/LazyLacey/LazyLacey.github.io/commit/3024a9e6f352dfddf5f7b9203d3f86b1ababb080))


### Bug Fixes

* **data:** audit romanian cards — remove duplicates, pad Вопросы group ([b5457ad](https://github.com/LazyLacey/LazyLacey.github.io/commit/b5457ad386594135aacb0acc6399a27227133469))
* **data:** audit spanish cards — remove duplicate, add omonym notes ([105e8e4](https://github.com/LazyLacey/LazyLacey.github.io/commit/105e8e43697fc1269023b2542b6201b7f6affd4a))

## [1.7.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.6.0...v1.7.0) (2026-06-06)


### Features

* add grammar files for IT/DE/KO/FR and audit body quality across all languages ([add14ab](https://github.com/LazyLacey/LazyLacey.github.io/commit/add14abb88769579f85ad7f5add1789da5759dae))
* add grammar test packs for DE/IT/FR/KO, add languages to registry, compact lang picker ([c3801fa](https://github.com/LazyLacey/LazyLacey.github.io/commit/c3801faf7e9284d519bb74f4c25721467d80b19c))
* complete French grammar and expand Spanish grammar ([0a7b930](https://github.com/LazyLacey/LazyLacey.github.io/commit/0a7b93051aaa125a8f8ca6db6846a5e1c878fcd9))

## [1.6.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.5.0...v1.6.0) (2026-06-03)


### Features

* virtualize cards list with virtual-scroller/dom ([b549f3d](https://github.com/LazyLacey/LazyLacey.github.io/commit/b549f3ded30cabecd457a4130a031d00107d46e0))


### Bug Fixes

* stabilize flaky tests in specs 03 and 06 ([9d6eaf3](https://github.com/LazyLacey/LazyLacey.github.io/commit/9d6eaf3e05ab74c1a506e1844a661cfbaad4e8a5))

## [1.5.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.4.0...v1.5.0) (2026-06-02)


### Features

* replace study screen settings panel with chips + drawers ([68d1277](https://github.com/LazyLacey/LazyLacey.github.io/commit/68d127766b22a5a05770971a9c1e19eb5265f61e))
* unified page components + study screen chip redesign ([657bcdf](https://github.com/LazyLacey/LazyLacey.github.io/commit/657bcdf367be727c06ad29d2940cfe47b1544de4))


### Bug Fixes

* correct btn-add-card selector and async count update ([1b150ed](https://github.com/LazyLacey/LazyLacey.github.io/commit/1b150ed568dc873028708338fa4a74fe1aebff8d))

## [1.4.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.3.0...v1.4.0) (2026-06-02)


### Features

* move Grammar to bottom nav, merge Cards/Groups into one page ([6e15cdd](https://github.com/LazyLacey/LazyLacey.github.io/commit/6e15cdd960974d827962d29b7547acef623a2317))
* replace group action buttons with three-dot dropdown menu ([79575c4](https://github.com/LazyLacey/LazyLacey.github.io/commit/79575c411565fd7eeefcf75f2e9e4f262b8bbfc5))


### Bug Fixes

* reset grammar on lang switch, remove add-from-grammar, restyle examples ([3d4a458](https://github.com/LazyLacey/LazyLacey.github.io/commit/3d4a45814c5d0baf390f81e8a2ae254429a18f68))

## [1.3.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.2.0...v1.3.0) (2026-06-02)


### Features

* overhaul PWA icons and add iOS splash screen ([5e459f9](https://github.com/LazyLacey/LazyLacey.github.io/commit/5e459f9a4a33322a59411854292d8822fcaf6422))

## [1.2.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.1.3...v1.2.0) (2026-06-02)


### Features

* switch language without page reload via onLangChange ([6b9de0e](https://github.com/LazyLacey/LazyLacey.github.io/commit/6b9de0e9ddf74ae8748dba02a1e03bad6f606e0b))


### Bug Fixes

* doImportWordsOnly reads groups and cards from DB before dedup ([7b53d1f](https://github.com/LazyLacey/LazyLacey.github.io/commit/7b53d1f40bfc825d41272a33c21b03f309374990))

## [1.1.3](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.1.2...v1.1.3) (2026-06-02)


### Bug Fixes

* deduplicate cards by ro+ru, export validateTestPack, fix pack counts ([a5316f1](https://github.com/LazyLacey/LazyLacey.github.io/commit/a5316f1adaa11137b3c1b29843443a121cad9726))
* export validateTestPack to window so loadReadyPack can call it ([22aab52](https://github.com/LazyLacey/LazyLacey.github.io/commit/22aab5214f60b004dc1c8772e1566e8ec2983317))

## [1.1.2](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.1.1...v1.1.2) (2026-06-02)


### Bug Fixes

* **ci:** add --repo flag to gh pr merge so it works without git checkout ([284f31f](https://github.com/LazyLacey/LazyLacey.github.io/commit/284f31fe004c55e5a21758657024fb8fc7ac9d9e))
* **ci:** drop --auto from gh pr merge (requires branch protection rules) ([fe287eb](https://github.com/LazyLacey/LazyLacey.github.io/commit/fe287ebe1adb85400814a58f7733e7e4504f1110))
* **ci:** extract PR number from release-please JSON output for auto-merge ([0cfaa8c](https://github.com/LazyLacey/LazyLacey.github.io/commit/0cfaa8c4771be5bc8749db62c1a70bf0f90eb3c0))
* **ci:** use --squash only (--merge and --squash are mutually exclusive) ([f739ec1](https://github.com/LazyLacey/LazyLacey.github.io/commit/f739ec1c80d1156c12bc69078f40b3be974c297a))
* use doImportWordsOnly for ready pack cards to preserve existing stats ([f76e5fc](https://github.com/LazyLacey/LazyLacey.github.io/commit/f76e5fcb6cc159482fc7efa2d87f27aaec5a62d9))

## [1.1.1](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.1.0...v1.1.1) (2026-06-02)


### Bug Fixes

* ready pack loading and language switch in onboarding ([a42851a](https://github.com/LazyLacey/LazyLacey.github.io/commit/a42851ab2e35f0bddfdd7ba46db09d7af1ecdbd4))

## [1.1.0](https://github.com/LazyLacey/LazyLacey.github.io/compare/v1.0.0...v1.1.0) (2026-06-02)


### Features

* complete Spanish content — grammar packs, test pack, verb pack ([09b91d9](https://github.com/LazyLacey/LazyLacey.github.io/commit/09b91d98731146bf355826653dd0c1e023fa7956))


### Bug Fixes

* auto-merge release PRs after checks pass, fix flaky e2e tests ([35ac4a1](https://github.com/LazyLacey/LazyLacey.github.io/commit/35ac4a117fff9c9d9f3103662e44cfa46f8f24ef))

## 1.0.0 (2026-06-01)


### Features

* add language-switch e2e tests (spec 18) + fix mode-type-hint case ([461b49a](https://github.com/LazyLacey/LazyLacey.github.io/commit/461b49a2b76acdbe53036b7cd93bea44c7afb4af))
* add Spanish language support ([c576065](https://github.com/LazyLacey/LazyLacey.github.io/commit/c576065ef2fec97d3ede8cba8aed6783ad30677b))
* **grammar:** add pronouns and stem-changing verbs to Spanish grammar ([caa40e3](https://github.com/LazyLacey/LazyLacey.github.io/commit/caa40e34f99cd1e042e9e9ded59c754b598bae87))
* improve Spanish grammar content — ser/estar, reflexive, subjuntivo, condicional ([5f39c43](https://github.com/LazyLacey/LazyLacey.github.io/commit/5f39c432c44fb4786fa630261ad58cb66ff8d53a))
* release-please + conventional commits для авто-версионирования ([fd338d6](https://github.com/LazyLacey/LazyLacey.github.io/commit/fd338d601810a869ab0a8331f93a83d4967fd0da))
* **spanish:** add Spanish vocabulary pack (~1570 cards, 45 groups) ([be3cf46](https://github.com/LazyLacey/LazyLacey.github.io/commit/be3cf465a289b61121840f85e89e1d40f395e35b))


### Bug Fixes

* export missing window functions from grammar-tests, settings, verb-trainer ([1812888](https://github.com/LazyLacey/LazyLacey.github.io/commit/1812888b989d67b7fd19159c245b11f51a5c2c7c))
* replace cat SVGs with original emojis (🎉 👍 💪 📭) ([f9dca1a](https://github.com/LazyLacey/LazyLacey.github.io/commit/f9dca1aba4307ef9a04e9e7c097f74c1706cbed2))
* replace hardcoded Romanian labels with dynamic language values ([564ce7d](https://github.com/LazyLacey/LazyLacey.github.io/commit/564ce7d5ba26d630999c361384334b355c0e4cc0))
* **romanian:** move parentheticals from ru to note, remove Romanian words from notes ([d33bff2](https://github.com/LazyLacey/LazyLacey.github.io/commit/d33bff2afbf995b47288429818230f5f9e4549f2))
* **spanish:** clean up card format — strip articles, remove hints with Spanish words ([899a1c0](https://github.com/LazyLacey/LazyLacey.github.io/commit/899a1c06e0c1110146217deb26219054934ac353))
* **spanish:** move disambiguations from ru to note field ([f977014](https://github.com/LazyLacey/LazyLacey.github.io/commit/f977014c178bf70a7a923d3441478d715007624d))
