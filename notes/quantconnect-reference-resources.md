# QuantConnect Reference Resources

Created: 2026-04-29

This file lists external resources to use when building and maintaining the reusable Python QuantConnect / LEAN AGENTS knowledge base. Keep this as a source guide; do not copy large external content into the template.

## Primary Documentation

- Writing Algorithms index: https://www.quantconnect.com/docs/v2/writing-algorithms
  - Use as the main source for algorithm-authoring concepts, APIs, and workflow guidance.
- Historical Data common errors: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/common-errors
  - Promote early into AGENTS guidance because it covers recurring practical failures such as indicator readiness and warmup restrictions.

## Source Repositories

- LEAN engine repository: https://github.com/QuantConnect/Lean
  - Use as implementation truth when documentation is ambiguous or incomplete.
- Python algorithm examples and regression algorithms: https://github.com/QuantConnect/Lean/tree/master/Algorithm.Python
  - Use for concrete Python patterns around securities, universes, options, futures, framework algorithms, consolidators, order tickets, and regression behavior.
- QuantConnect documentation repository: https://github.com/QuantConnect/Documentation
  - Use for searchable documentation source and change tracking.
- Writing Algorithms documentation source: https://github.com/QuantConnect/Documentation/tree/master/03%20Writing%20Algorithms
  - Use when the website is hard to navigate or when source diffs are useful.

## Local and Engine Documentation

- LEAN CLI getting started: https://www.quantconnect.com/docs/v2/lean-cli/key-concepts/getting-started
  - Use for local development, Docker, authentication, and CLI workflow assumptions.
- LEAN CLI research environment: https://www.quantconnect.com/docs/v2/lean-cli/research
  - Use for local research notebooks, retrieving backtest results, and VS Code/Jupyter workflow notes.
- LEAN CLI overview: https://www.lean.io/cli/
  - Use as a broad overview of local research, backtesting, optimization, live trading, and cloud integration.
- LEAN Engine getting started: https://www.quantconnect.com/docs/v2/lean-engine/getting-started
  - Use for engine architecture, configuration, handlers, and lower-level behavior that explains algorithm/runtime differences.

## Forum Threads for Gotcha Research

Forum threads are useful for recurring problems and staff explanations, but they should not be treated as primary authority without checking current docs or source.

- Consolidator timing and warming up indicators: https://www.quantconnect.com/forum/discussion/5648/consolidator-timing-and-warming-up-indicators/
  - Relevant to consolidator bar timing, warmup expectations, and calendar behavior.
- Indicator history consolidator: https://www.quantconnect.com/forum/discussion/4730/indicator-history-consolidator/
  - Relevant to RollingWindow patterns and pushing historical data through consolidators.
- Universe selection, consolidators, and history in Python: https://www.quantconnect.com/forum/discussion/9920/universe-selection-consolidators-and-history-in-python/
  - Relevant to dynamic universes, per-symbol strategy objects, and Python consolidator update issues.
- Indicator consolidator problem: https://www.quantconnect.com/forum/discussion/9429/indicator-consolidator-problem/
  - Relevant to manual indicator updates from consolidated bars, warmup behavior, extended market hours, and Python named-argument limitations.

## Intended Use in AGENTS.md

- Promote only durable, repeated QuantConnect / LEAN coding guidance into `templates/AGENTS.quantconnect.md`.
- Prefer links for broad references, large catalogs, examples, vendor datasets, and forum discussions.
- Verify forum-derived guidance against official docs or the LEAN source before turning it into an AGENTS rule.
- Keep the AGENTS template Python-focused.
