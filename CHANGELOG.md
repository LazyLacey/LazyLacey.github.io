# Changelog

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
