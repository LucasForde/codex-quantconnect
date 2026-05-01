# QuantConnect Docs to AGENTS Plan

Source map: `notes/quantconnect-writing-algorithms-doc-map.md`

Goal: Convert selected QuantConnect Writing Algorithms documentation areas into reusable Codex guidance for `templates/AGENTS.quantconnect.md` later. This file is a planning note only; it is not the final AGENTS knowledge base.

Standing assumption: the reusable AGENTS knowledge base should target Python QuantConnect / LEAN projects only. Do not spend AGENTS.md space on C# equivalents unless a future prompt explicitly asks for them.

## Highest Priority AGENTS Guidance

These areas should become reusable, evergreen instructions because they affect nearly every QuantConnect project:

- Algorithm lifecycle and structure: Key Concepts, Initialization, event handlers, `Initialize`, `OnData`, warmup, and Python project conventions.
- Data subscriptions and securities: Adding securities, handling `Slice`, market hours, resolution, fill-forward, normalization, asset-class differences, and contract universes.
- Historical data and warmup: History request shapes, response handling, common errors, rolling windows, and readiness checks.
- Trading and orders: Order tickets, order events, sizing, liquidation, order errors, brokerage-supported order types, and avoiding duplicate/immediate-fill assumptions.
- Portfolio state: Holdings, cash book, buying power, invested checks, multi-currency behavior, and margin assumptions.
- Reality modeling: Brokerage models, fees, slippage, fills, buying power, settlement, short availability, and option assignment/exercise.
- Indicators and consolidators: Readiness, automatic vs manual updates, consolidator lifecycle, indicator warmup, per-symbol state, and dynamic universe cleanup.
- Logging/charting/statistics: Practical diagnostics, limits, runtime statistics, trade statistics, and how to debug without excessive output.

## Second Priority AGENTS Guidance

These areas should become reusable guidance, but mostly as conditional modules depending on project type:

- Universes: Dynamic selection, universe settings, added/removed securities, fundamental/liquidity/ETF/custom universes, and contract selection.
- Algorithm Framework: When to use classic `QCAlgorithm` vs framework modules, and how universe/alpha/portfolio/risk/execution models interact.
- Live trading: Backtest/live divergence, brokerage/data provider selection, reconciliation, notifications, commands, and operational guardrails.
- Object Store: Safe persistence of model artifacts and derived data, versioning, quotas, and avoiding secrets.
- Machine Learning: Data leakage prevention, training/inference separation, model persistence, dependency limits, retraining schedules, and live latency.
- Optimization: Parameter definitions, walk-forward optimization, overfitting controls, and reproducible experiment notes.

## Reference-Only or Project-Specific Guidance

These should usually remain as links or targeted notes unless a future project needs them:

- Datasets: Keep a map of common datasets and vendor caveats, but avoid embedding every vendor schema in AGENTS.md.
- Strategy Library: Treat as examples and inspiration, not reusable rules.
- API Reference: Link for lookup rather than duplicating API details.
- Migrations: Include only when translating from Zipline or another framework.
- Asset-class deep dives: Add targeted modules for equities, options, futures, crypto, forex, CFDs, or indexes only when actively used.

## Proposed Future AGENTS.md Shape

When ready, evolve `templates/AGENTS.quantconnect.md` into:

1. Workspace and project assumptions.
2. How Codex should inspect a QuantConnect project before editing.
3. QuantConnect algorithm lifecycle rules.
4. Data subscription, history, and warmup rules.
5. Portfolio, orders, and brokerage/reality-modeling rules.
6. Indicators, consolidators, and per-symbol state rules.
7. Universe-selection rules.
8. Algorithm Framework rules, clearly separated from classic algorithms.
9. Live-trading cautions and operational checks.
10. Debugging, logging, charting, and statistics guidance.
11. Source links back to the relevant QuantConnect docs.

## Open Research Tasks

- Verify exact Python naming patterns and .NET interop behavior for common `QCAlgorithm` methods and properties.
- Build a compact gotchas list from the Historical Data common errors page.
- Research dynamic universe cleanup patterns for consolidators, indicators, and symbol data containers.
- Research order-event-driven patterns for avoiding duplicate orders and stale portfolio assumptions.
- Research asset-class-specific modules only when needed by active projects.
- Decide whether AGENTS.md should include short code idioms or only behavioral instructions.
