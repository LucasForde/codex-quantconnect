# QuantConnect / LEAN Python Agent Knowledge Base

This file is reusable `AGENTS.md` guidance for QuantConnect / LEAN projects. It is intended to be copied into an individual QuantConnect project as `AGENTS.md` before using Codex in that project.

## Scope

- Target Python QuantConnect / LEAN projects only.
- Prefer official QuantConnect documentation and LEAN source/examples over memory when behavior is uncertain.
- Do not add secrets, brokerage credentials, API keys, account numbers, or private tokens.
- Do not give strategy or trading advice unless the user explicitly asks for research help. Focus on correct implementation, debugging, and maintainability.
- Keep project-specific assumptions local to the project. Only promote reusable lessons back into this template after they are generally useful.

## Working Preference

Prefer minimal, targeted code changes over verbose implementations or broad edge-case handling.

When asked to write or change code:

- Stay within the exact scope of the request.
- Do not add extra abstractions, helper layers, configuration systems, or defensive logic unless they are clearly necessary.
- Do not solve adjacent problems unless explicitly asked.
- Prefer the smallest readable change that achieves the goal.
- Mention important edge cases briefly, but do not implement support for them unless requested.
- If a request is ambiguous, ask before expanding the scope.

## Before Editing a Project

Inspect the project before changing code:

- Identify the main algorithm file and whether the project uses classic `QCAlgorithm` style or Algorithm Framework modules.
- Identify the asset classes used: equities, options, futures, crypto, forex, CFDs, indexes, custom data, or alternative data.
- Identify the intended mode if visible: research, backtest, optimization, paper trading, or live trading.
- Check data subscriptions, resolutions, market hours, normalization settings, universe selection, warmup, brokerage/reality models, and scheduled events.
- Check existing logs, backtest results, research notebooks, config files, and project notes when available.
- Preserve user code style and project structure unless there is a clear reason to change it.

## Python and LEAN Conventions

- Use Python QuantConnect idioms that match the project. Many APIs are .NET-backed, so method/property names may appear in PascalCase or snake_case depending on project style and API support.
- Be careful with Python named arguments for LEAN/.NET methods. If a call behaves unexpectedly, prefer documented positional signatures or verify the current API.
- Treat `Symbol`, `Security`, `TradeBar`, `QuoteBar`, `Slice`, `OrderTicket`, `OrderEvent`, and indicator objects as LEAN objects with .NET interop behavior.
- Avoid hidden global state. Keep algorithm state on `self` or in explicit per-symbol state containers.
- Prefer small per-symbol helper classes when managing dynamic universes, indicators, consolidators, rolling windows, and open orders.

## Algorithm Lifecycle

- Put one-time configuration in `Initialize`: dates, cash, brokerage model, account currency, securities, universe settings, warmup, benchmark, scheduled events, and persistent state setup.
- Do not place trades in `Initialize` or during warmup.
- Use `OnData` for data-driven logic and keep it defensive: data may be missing for a subscribed symbol in a given `Slice`.
- Use `OnSecuritiesChanged` to create and clean up per-symbol state for dynamic universes.
- Use `OnOrderEvent` to react to fills, cancellations, invalid orders, and partial fills instead of assuming an order filled immediately.
- If using scheduled events, confirm the date/time rules, market calendar, time zone, warmup interaction, and data readiness.

## Securities and Data Subscriptions

- Add securities before relying on their data, holdings, indicators, or history.
- Match subscription resolution to the strategy's real data needs. Do not assume minute, daily, quote, trade, or tick data are interchangeable.
- Handle missing data explicitly. Before using values from a `Slice`, check that the symbol/data type is present.
- Be explicit about extended market hours, fill-forward, leverage, data normalization, and market when those choices affect results.
- For options, futures, and other contract-based assets, distinguish universe/filter selection from specific tradable contracts.
- For equities, remember that corporate actions and normalization settings can affect price series and comparisons.
- For forex and crypto, check quote conventions, market availability, lot sizing, fees, and brokerage support.

## Historical Data and Warmup

- Use history for feature windows, indicator warmup, model training samples, and context, but avoid repeated large history calls inside frequent events.
- Verify the shape of Python history responses before indexing. History may return a DataFrame, typed objects, or empty results depending on the request.
- Always handle empty or shorter-than-requested history. Assets may not have enough data, especially around IPOs, newly listed contracts, sparse custom data, or live starts.
- Do not trade while `self.IsWarmingUp` is true.
- Check indicator readiness before using indicator values. `IsReady` matters even after warmup if history was insufficient.
- For rolling windows, remember that index `0` is the most recent value.
- For live trading, verify how much historical data is available and whether the live provider supports the same requests used in backtests.

## Indicators and Consolidators

- Decide whether an indicator is automatic or manual. Avoid double-updating the same indicator.
- If an indicator should use consolidated bars, create the indicator object directly and update it from the consolidator handler, or register it with the correct consolidator.
- Confirm bar close semantics. Consolidated bars fire when the period completes, not necessarily when a human chart label would suggest.
- Warm up indicators with data that matches the indicator's input cadence and type.
- For dynamic universes, remove consolidators and event handlers when securities leave the universe to prevent stale updates and memory growth.
- Keep per-symbol indicators, consolidators, rolling windows, and tickets in per-symbol state rather than parallel loose dictionaries when complexity grows.

## Portfolio and Orders

- Distinguish signals, order submissions, order tickets, order events, and final portfolio state.
- Use portfolio and security holdings to check actual exposure, but remember state changes after fills, not after order submission.
- Use order tickets when orders may need updates, cancellation, or tracking.
- Use `OnOrderEvent` for fill-aware logic, especially with limit, stop, combo, option, or live brokerage orders.
- Avoid duplicate orders by tracking pending tickets or intended target state.
- Validate sizing against buying power, lot sizes, leverage, margin model, fees, and current holdings.
- Use `SetHoldings` only when target-percent behavior is intended. Use explicit order methods when order type, price, tag, or ticket management matters.
- Be cautious with `Liquidate`; understand whether it should liquidate all holdings, one symbol, or interact with pending orders.

## Reality Modeling

- Check brokerage model, fee model, slippage model, fill model, buying power model, settlement model, and short availability before trusting backtest realism.
- Do not assume backtest fills represent live fills, especially for illiquid assets, options, futures, market-on-open/close orders, stop orders, or crypto venues.
- Match brokerage/data-provider assumptions to the intended deployment when live trading is relevant.
- For options, consider pricing model, greeks, volatility model, exercise, and assignment behavior.
- For margin or short strategies, verify buying power, borrow/short availability, settlement, margin calls, and interest assumptions.

## Universes

- Universe selection changes subscriptions over time. Keep selection logic deterministic and cheap.
- Use `OnSecuritiesChanged` to initialize new symbols and clean up removed symbols.
- Make universe settings explicit when resolution, leverage, fill-forward, extended hours, or normalization matter.
- Do not assume newly selected symbols have ready indicators or enough history.
- For option/future universes, separate the filter criteria from final contract choice and order placement.
- For asynchronous or scheduled universes, verify timing assumptions before using selected symbols in trading logic.

## Algorithm Framework

- First identify whether the project uses classic `QCAlgorithm` or Algorithm Framework. Do not mix patterns casually.
- In framework projects, reason through the module chain: Universe Selection -> Alpha -> Portfolio Construction -> Risk Management -> Execution.
- Treat Insights as framework state with lifecycle, direction, magnitude/confidence, expiry, and portfolio construction implications.
- Keep classic order placement out of framework modules unless the project intentionally uses a hybrid approach.
- Prefer simple classic `QCAlgorithm` structure when the project does not need framework modularity.

## Object Store and Persistence

- Use the Object Store for model artifacts, derived data, and reusable state that must persist across runs.
- When a project includes `object-store.json`, treat it as a local copy of Object Store output from recent backtests.
- Use `object-store.json` as a development/debugging artifact when it helps inspect recorded strategy events, data shape, or backtest behavior.
- The user may refresh `object-store.json` after running new backtests.
- Do not treat `object-store.json` as strategy source code, configuration, or a file that should be edited unless the user explicitly asks.
- Do not store secrets or credentials in project files or Object Store examples.
- Version persisted artifacts when schema, model parameters, or feature definitions can change.
- Handle missing, corrupt, or old object-store data defensively.

## Machine Learning and Optimization

- Guard against look-ahead bias and feature/label misalignment.
- Separate training, validation, inference, and retraining schedules clearly.
- Persist models and metadata deliberately; include enough version information to know whether an artifact is compatible.
- For optimization, keep parameters explicit and avoid hard-coding optimized values without notes.
- Treat optimization and walk-forward results as research artifacts, not proof of live robustness.

## Logging, Charting, and Statistics

- Use logs and charts to diagnose state, signals, orders, and data readiness, but avoid noisy per-bar output unless actively debugging.
- Prefer structured, sparse debug messages with symbol, time, state, and reason.
- Use runtime, algorithm, and trade statistics before inventing custom performance calculations.
- When debugging, check warmup state, data presence, indicator readiness, open orders, holdings, and recent order events first.

## Live Trading Cautions

- Before live deployment, check brokerage support, data provider support, market hours, order types, fees, buying power, reconciliation, notifications, and restart behavior.
- Expect differences between backtest, paper, and live trading due to latency, data provider differences, partial fills, rejected orders, disconnections, and brokerage constraints.
- Add operational safeguards for live algorithms: clear logs, notifications for critical failures, defensive order handling, and safe behavior on missing data.

## Source Links

- Writing Algorithms: https://www.quantconnect.com/docs/v2/writing-algorithms
- Historical Data common errors: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/common-errors
- API Reference: https://www.quantconnect.com/docs/v2/writing-algorithms/api-reference
- LEAN repository: https://github.com/QuantConnect/Lean
- Python examples: https://github.com/QuantConnect/Lean/tree/master/Algorithm.Python
- Documentation repository: https://github.com/QuantConnect/Documentation
- LEAN CLI docs: https://www.quantconnect.com/docs/v2/lean-cli/key-concepts/getting-started
- LEAN Engine docs: https://www.quantconnect.com/docs/v2/lean-engine/getting-started
