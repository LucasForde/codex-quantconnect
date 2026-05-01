# QuantConnect Writing Algorithms Documentation Map

Source index: https://www.quantconnect.com/docs/v2/writing-algorithms

Created: 2026-04-29

This is a local map of the QuantConnect Writing Algorithms documentation. It is intentionally a summary and navigation aid, not a copy of the documentation.

## Top-Level Sections

- Key Concepts
- Initialization
- Securities
- Portfolio
- Universes
- Datasets
- Importing Data
- Consolidating Data
- Historical Data
- Trading and Orders
- Reality Modeling
- Scheduled Events
- Indicators
- Object Store
- Optimization
- Machine Learning
- Algorithm Framework
- Charting
- Logging
- Statistics
- Live Trading
- Strategy Library
- API Reference
- Migrations

## Section Map

### Key Concepts

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/getting-started
- Covers: Core LEAN/QCAlgorithm concepts before writing algorithms, including the algorithm engine, multi-asset modeling, time modeling, security identifiers, event handlers, Python and LEAN behavior, research workflow, libraries, debugging, and glossary material.
- Why it matters: This is the base mental model for how LEAN runs algorithms and how Codex should reason about algorithm lifecycle, data slices, symbols, time zones, and Python/C# API conventions.
- Gotchas to investigate later: Time zone handling, `Slice` data availability, symbol identifier behavior across corporate actions, Python duck typing against .NET objects, and accidental use of globals/statics.
- Important pages:
  - Getting Started: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/getting-started
  - Algorithm Engine: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/algorithm-engine
  - Multi-Asset Modeling: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/multi-asset-modeling
  - Time Modeling: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/time-modeling/time-zones
  - Security Identifiers: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/security-identifiers
  - Event Handlers: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/event-handlers
  - Python and LEAN: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/python-and-lean
  - Debugging Tools: https://www.quantconnect.com/docs/v2/writing-algorithms/key-concepts/debugging-tools

### Initialization

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/initialization
- Covers: The `Initialize` method and startup configuration such as dates, cash, brokerage model, account currency, securities, universe settings, warmup, benchmark, and algorithm-level settings.
- Why it matters: Most algorithm behavior is fixed or seeded during initialization; bad setup creates downstream bugs that look like data, order, or portfolio problems.
- Gotchas to investigate later: Setting start/end dates and cash correctly, adding securities before using indicators or history, choosing brokerage/account models deliberately, warmup readiness, and avoiding runtime-only calls in initialization.
- Important pages:
  - Initialization: https://www.quantconnect.com/docs/v2/writing-algorithms/initialization
  - Brokerage Models: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/brokerages/key-concepts
  - Warm Up Periods: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/warm-up-periods
  - Universe Settings: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/settings

### Securities

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/key-concepts
- Covers: Security objects and subscriptions, requesting and handling data, market hours, filtering data, and asset-class-specific behavior for equities, options, crypto, forex, futures, indexes, CFDs, and related derivatives.
- Why it matters: Securities define what data the algorithm receives and what instruments can be traded. Asset classes differ materially in subscriptions, market hours, contract selection, pricing, and order behavior.
- Gotchas to investigate later: Resolution/fill-forward assumptions, missing data in `Slice`, option/future contract filtering, continuous futures behavior, corporate actions, crypto/forex quote conventions, and market-hours edge cases.
- Important pages:
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/key-concepts
  - Requesting Data: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/requesting-data
  - Handling Data: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/handling-data
  - Market Hours: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/market-hours
  - Filtering Data: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/filtering-data
  - US Equity: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/asset-classes/us-equity/requesting-data
  - Equity Options: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/asset-classes/equity-options/requesting-data/universes
  - Futures: https://www.quantconnect.com/docs/v2/writing-algorithms/securities/asset-classes/futures/requesting-data/universes

### Portfolio

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/portfolio/key-concepts
- Covers: Portfolio state, holdings, cash book, invested state, buying power, currency conversion, unrealized/realized P&L, and per-security holdings.
- Why it matters: Trading logic often depends on current exposure, buying power, cash, and position state. Codex should distinguish target holdings, orders, fills, and actual portfolio state.
- Gotchas to investigate later: Cash vs holdings value, multi-currency cash book behavior, stale assumptions before order fills, unsettled cash, margin buying power, and checking `Invested` at the portfolio vs security level.
- Important pages:
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/portfolio/key-concepts
  - Holdings: https://www.quantconnect.com/docs/v2/writing-algorithms/portfolio/holdings
  - Cashbook: https://www.quantconnect.com/docs/v2/writing-algorithms/portfolio/cashbook

### Universes

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/key-concepts
- Covers: Dynamic security selection, universe settings, equity/fundamental/ETF universes, option/future/index option/crypto universes, custom universes, and dataless scheduled universes.
- Why it matters: Universe selection controls the algorithm's tradable/security subscription set over time and is central to scalable multi-asset or cross-sectional strategies.
- Gotchas to investigate later: Selection timing, added/removed security events, asynchronous universe selection, universe settings inheritance, coarse/fundamental availability, contract churn, and warming indicators for newly added symbols.
- Important pages:
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/key-concepts
  - Settings: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/settings
  - Liquidity Universes: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/equity/liquidity-universes
  - Fundamental Universes: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/equity/fundamental-universes
  - ETF Constituents Universes: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/equity/etf-constituents-universes
  - Custom Universes: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/custom-universes
  - Dataless Scheduled Universes: https://www.quantconnect.com/docs/v2/writing-algorithms/universes/dataless-scheduled-universes

### Datasets

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/datasets/overview
- Covers: Available QuantConnect and third-party datasets, including core market data, fundamentals, alternative data, news, macro, options/futures universes, and vendor-specific data.
- Why it matters: Data availability, licensing, symbol mapping, and point-in-time behavior determine whether a strategy can be backtested and deployed correctly.
- Gotchas to investigate later: Dataset permissions, survivorship/look-ahead bias, update frequency, live availability, asset coverage, custom data mapping, and vendor-specific schemas.
- Important pages:
  - Overview: https://www.quantconnect.com/docs/v2/writing-algorithms/datasets/overview
  - QuantConnect datasets: https://www.quantconnect.com/docs/v2/writing-algorithms/datasets/quantconnect/us-equity-security-master
  - Morningstar fundamentals: https://www.quantconnect.com/docs/v2/writing-algorithms/datasets/morningstar/us-fundamental-data
  - US ETF Constituents: https://www.quantconnect.com/docs/v2/writing-algorithms/datasets/quantconnect/us-etf-constituents
  - Benzinga News Feed: https://www.quantconnect.com/docs/v2/writing-algorithms/datasets/benzinga/benzinga-news-feed

### Importing Data

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/importing-data/key-concepts
- Covers: Bringing custom data into algorithms through streaming data, custom securities, custom universes, CSV/JSON formats, precomputed ML predictions, and bulk downloads.
- Why it matters: Many serious strategies require proprietary or derived data. The import path must be reproducible in backtests and live deployment.
- Gotchas to investigate later: Time stamps and time zones, data normalization, reader/schema implementation, remote file reliability, rate limits, symbol mapping, sparse data, and live vs backtest source differences.
- Important pages:
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/importing-data/key-concepts
  - Streaming Data: https://www.quantconnect.com/docs/v2/writing-algorithms/importing-data/streaming-data/key-concepts
  - Custom Securities: https://www.quantconnect.com/docs/v2/writing-algorithms/importing-data/streaming-data/custom-securities/key-concepts
  - CSV Format Example: https://www.quantconnect.com/docs/v2/writing-algorithms/importing-data/streaming-data/custom-securities/csv-format-example
  - JSON Format Example: https://www.quantconnect.com/docs/v2/writing-algorithms/importing-data/streaming-data/custom-securities/json-format-example
  - Bulk Downloads: https://www.quantconnect.com/docs/v2/writing-algorithms/importing-data/bulk-downloads

### Consolidating Data

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/consolidating-data/getting-started
- Covers: Building larger or custom bars from smaller data, time period/calendar/count/mixed-mode consolidators, Renko/range consolidators, consolidator history, and indicator updates through consolidators.
- Why it matters: Most strategies depend on bars or features at a different cadence than raw subscriptions. Consolidators are the canonical LEAN mechanism for this.
- Gotchas to investigate later: Event timing, consolidator disposal for dynamic universes, duplicate indicator updates, bar close semantics, mixed resolutions, extended market hours, and history warmup for consolidators.
- Important pages:
  - Getting Started: https://www.quantconnect.com/docs/v2/writing-algorithms/consolidating-data/getting-started
  - Time Period Consolidators: https://www.quantconnect.com/docs/v2/writing-algorithms/consolidating-data/consolidator-types/time-period-consolidators
  - Calendar Consolidators: https://www.quantconnect.com/docs/v2/writing-algorithms/consolidating-data/consolidator-types/calendar-consolidators
  - Combining Consolidators: https://www.quantconnect.com/docs/v2/writing-algorithms/consolidating-data/consolidator-types/combining-consolidators
  - Consolidator History: https://www.quantconnect.com/docs/v2/writing-algorithms/consolidating-data/consolidator-history
  - Updating Indicators: https://www.quantconnect.com/docs/v2/writing-algorithms/consolidating-data/updating-indicators

### Historical Data

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/getting-started
- Covers: History requests and responses, asset-class-specific historical data, alternative/custom/universe data history, warmup periods, rolling windows, common errors, and live trading history behavior.
- Why it matters: Historical data powers warmup, feature computation, model training, context windows, and validation. Incorrect history use is a common source of slow or biased algorithms.
- Gotchas to investigate later: Request overload, history response shapes in Python, missing data, end-time semantics, fill-forward behavior, option/future history quirks, warmup readiness, and rolling window indexing.
- Important pages:
  - Getting Started: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/getting-started
  - History Requests: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/history-requests
  - History Responses: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/history-responses
  - Warm Up Periods: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/warm-up-periods
  - Rolling Window: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/rolling-window
  - Common Errors: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/common-errors
  - Live Trading: https://www.quantconnect.com/docs/v2/writing-algorithms/historical-data/live-trading

### Trading and Orders

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/key-concepts
- Covers: Placing and managing orders, order tickets, transaction manager, order types, pre-trade risk control, position sizing, liquidation, crypto trades, option strategies, order properties/events/errors, trade statistics, trading calendar, and financial advisor use.
- Why it matters: Correct order handling separates desired signals from actual executable behavior. Codex must reason about asynchronous fills, tickets, order events, and brokerage constraints.
- Gotchas to investigate later: Assuming immediate fills, ignoring order events, duplicate orders, incorrect quantity sizing, unsupported order types per brokerage/security, MOO/MOC timing, combo/option strategy constraints, and liquidation side effects.
- Important pages:
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/key-concepts
  - Order Tickets: https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/order-management/order-tickets
  - Transaction Manager: https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/order-management/transaction-manager
  - Order Types: https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/order-types
  - Position Sizing: https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/position-sizing
  - Order Events: https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/order-events
  - Order Errors: https://www.quantconnect.com/docs/v2/writing-algorithms/trading-and-orders/order-errors

### Reality Modeling

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/key-concepts
- Covers: Fill, slippage, fee, brokerage, buying power, settlement, options pricing/volatility/exercise/assignment, interest rates, dividend yield, margin calls, and short availability models.
- Why it matters: Reality models define the gap between a theoretical signal and simulated/live execution. They are critical for realistic backtests and brokerage-compatible live behavior.
- Gotchas to investigate later: Using default models without matching the target brokerage, unrealistic fill assumptions, missing fees/slippage, margin model surprises, option assignment/exercise behavior, and short availability constraints.
- Important pages:
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/key-concepts
  - Trade Fills: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/trade-fills/key-concepts
  - Slippage: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/slippage/key-concepts
  - Transaction Fees: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/transaction-fees/key-concepts
  - Brokerages: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/brokerages/key-concepts
  - Buying Power: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/buying-power
  - Margin Calls: https://www.quantconnect.com/docs/v2/writing-algorithms/reality-modeling/margin-calls

### Scheduled Events

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/scheduled-events
- Covers: Date/time rules and scheduled callbacks for running logic at specific market or calendar times.
- Why it matters: Scheduled events are the right tool for periodic rebalancing, pre/post-market routines, daily model updates, and tasks that should not run on every data event.
- Gotchas to investigate later: Event time zone, market-hours date rules, callbacks before data readiness, interaction with warmup, duplicate scheduling, and differences between backtest and live timing.
- Important pages:
  - Scheduled Events: https://www.quantconnect.com/docs/v2/writing-algorithms/scheduled-events

### Indicators

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/key-concepts
- Covers: Built-in technical indicators and candlestick patterns, manual and automatic indicators, plotting indicators, combining indicators, custom indicators, indicator universes, and rolling windows.
- Why it matters: Indicators are a standard way to maintain stateful features. Codex must handle readiness, updates, warmup, and per-symbol indicator management correctly.
- Gotchas to investigate later: Using indicators before `IsReady`, double-updating automatic indicators, registering indicators with the wrong resolution/selector, dynamic universe cleanup, RollingWindow indexing, and indicator warmup.
- Important pages:
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/key-concepts
  - Supported Indicators: https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/supported-indicators
  - Manual Indicators: https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/manual-indicators
  - Automatic Indicators: https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/automatic-indicators
  - Combining Indicators: https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/combining-indicators
  - Custom Indicators: https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/custom-indicators
  - Indicator Universes: https://www.quantconnect.com/docs/v2/writing-algorithms/indicators/indicator-universes

### Object Store

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/object-store
- Covers: Persistent file storage for saving, reading, deleting, and organizing data used by algorithms.
- Why it matters: The object store is the sanctioned place for reusable state, model artifacts, and intermediate files across backtests/live deployments.
- Gotchas to investigate later: Storage quotas, serialization format, file naming, cloud/local differences, live read/write behavior, avoiding secrets, and model artifact versioning.
- Important pages:
  - Object Store: https://www.quantconnect.com/docs/v2/writing-algorithms/object-store

### Optimization

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/optimization/parameters
- Covers: Optimization parameters and walk-forward optimization.
- Why it matters: Parameterization and optimization workflow affect reproducibility and overfitting risk.
- Gotchas to investigate later: Overfitting, parameter bounds, discrete vs continuous parameter choices, optimizing on unstable metrics, walk-forward split choices, and keeping optimized parameters separate from hard-coded assumptions.
- Important pages:
  - Parameters: https://www.quantconnect.com/docs/v2/writing-algorithms/optimization/parameters
  - Walk Forward Optimization: https://www.quantconnect.com/docs/v2/writing-algorithms/optimization/walk-forward-optimization

### Machine Learning

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/machine-learning/key-concepts
- Covers: ML model training and supported/popular libraries, including scikit-learn, PyTorch, TensorFlow, XGBoost, Keras, time-series libraries, and Hugging Face models.
- Why it matters: ML workflows need careful separation of training, inference, persistence, and data leakage controls inside LEAN's event-driven model.
- Gotchas to investigate later: Look-ahead bias, retraining schedules, feature alignment, model artifact storage, dependency availability, compute limits, live inference latency, and deterministic backtests.
- Important pages:
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/machine-learning/key-concepts
  - Training Models: https://www.quantconnect.com/docs/v2/writing-algorithms/machine-learning/training-models
  - Scikit-Learn: https://www.quantconnect.com/docs/v2/writing-algorithms/machine-learning/popular-libraries/scikit-learn
  - PyTorch: https://www.quantconnect.com/docs/v2/writing-algorithms/machine-learning/popular-libraries/pytorch
  - XGBoost: https://www.quantconnect.com/docs/v2/writing-algorithms/machine-learning/popular-libraries/xgboost
  - Hugging Face Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/machine-learning/hugging-face/key-concepts

### Algorithm Framework

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/overview
- Covers: Modular algorithm architecture with universe selection, alpha, portfolio construction, risk management, execution, hybrid algorithms, and insight management.
- Why it matters: Framework algorithms need different guidance than classic `QCAlgorithm` scripts. Reusable AGENTS guidance should help Codex identify which style the project uses.
- Gotchas to investigate later: Mixing classic and framework patterns incorrectly, insight lifecycle, portfolio construction assumptions, execution/risk model interactions, universe model timing, and using framework modules where simple classic code would be clearer.
- Important pages:
  - Overview: https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/overview
  - Universe Selection: https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/universe-selection/key-concepts
  - Alpha: https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/alpha/key-concepts
  - Portfolio Construction: https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/portfolio-construction/key-concepts
  - Risk Management: https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/risk-management/key-concepts
  - Execution: https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/execution/key-concepts
  - Insight Manager: https://www.quantconnect.com/docs/v2/writing-algorithms/algorithm-framework/insight-manager

### Charting

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/charting
- Covers: Custom charts, series, and plotting from algorithms.
- Why it matters: Charting is useful for debugging signals, validating model state, and exposing strategy diagnostics during backtests and live runs.
- Gotchas to investigate later: Excessive plotting volume, chart/series naming, plotting unsupported types, live chart limits, and performance impact.
- Important pages:
  - Charting: https://www.quantconnect.com/docs/v2/writing-algorithms/charting

### Logging

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/logging
- Covers: Logging and debug output from algorithms.
- Why it matters: Logs are essential for diagnosing backtest/live behavior, but too much logging can obscure useful information or hit limits.
- Gotchas to investigate later: Log throttling/limits, debug vs log vs error use, live log visibility, noisy per-bar logs, and preserving enough context for order/data problems.
- Important pages:
  - Logging: https://www.quantconnect.com/docs/v2/writing-algorithms/logging

### Statistics

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/statistics
- Covers: Algorithm, runtime, and trade statistics.
- Why it matters: Statistics are how backtest and live performance are evaluated. Codex should know where to look before inventing custom performance calculations.
- Gotchas to investigate later: Difference between algorithm/runtime/trade statistics, annualization assumptions, drawdown interpretation, trade statistics with partial fills, and comparing backtest vs live statistics.
- Important pages:
  - Statistics: https://www.quantconnect.com/docs/v2/writing-algorithms/statistics
  - Algorithm Statistics: https://www.quantconnect.com/docs/v2/writing-algorithms/statistics/algorithm-statistics
  - Runtime Statistics: https://www.quantconnect.com/docs/v2/writing-algorithms/statistics/runtime-statistics
  - Trade Statistics: https://www.quantconnect.com/docs/v2/writing-algorithms/statistics/trade-statistics

### Live Trading

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/live-trading
- Covers: Live deployment concepts, brokerages, data providers, live trading/order behavior, reconciliation, notifications, commands, arbitrage, charting/logging, and signal exports.
- Why it matters: Live algorithms have stricter requirements around data providers, brokerages, latency, reconciliation, monitoring, and operational controls.
- Gotchas to investigate later: Backtest/live divergence, brokerage support, data-provider mismatch, order reconciliation, notifications, restart behavior, live history limitations, command handling, and chart/log limits.
- Important pages:
  - Live Trading: https://www.quantconnect.com/docs/v2/writing-algorithms/live-trading
  - Key Concepts: https://www.quantconnect.com/docs/v2/writing-algorithms/live-trading/key-concepts
  - Brokerages: https://www.quantconnect.com/docs/v2/writing-algorithms/live-trading/brokerages
  - Data Providers: https://www.quantconnect.com/docs/v2/writing-algorithms/live-trading/data-providers
  - Reconciliation: https://www.quantconnect.com/docs/v2/writing-algorithms/live-trading/reconciliation
  - Notifications: https://www.quantconnect.com/docs/v2/writing-algorithms/live-trading/notifications
  - Commands: https://www.quantconnect.com/docs/v2/writing-algorithms/live-trading/commands

### Strategy Library

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/strategy-library
- Covers: Tutorials and example strategies from QuantConnect and community contributors.
- Why it matters: Useful as examples of patterns and API usage, but examples should be adapted carefully rather than copied blindly into reusable rules.
- Gotchas to investigate later: Example age, API drift, overfitting to tutorial assumptions, hidden data requirements, and confusing educational examples with production patterns.
- Important pages:
  - Strategy Library: https://www.quantconnect.com/docs/v2/writing-algorithms/strategy-library

### API Reference

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/api-reference
- Covers: `QCAlgorithm` API reference.
- Why it matters: This is the authoritative API lookup for methods/properties exposed to algorithms.
- Gotchas to investigate later: Python naming conventions vs C# API names, overloads and enum values, API availability by environment, and method behavior that depends on security type or subscription state.
- Important pages:
  - API Reference: https://www.quantconnect.com/docs/v2/writing-algorithms/api-reference

### Migrations

- Source: https://www.quantconnect.com/docs/v2/writing-algorithms/migrations/zipline
- Covers: Guidance for transitioning from other trading engines to LEAN, currently including Zipline migration topics such as initialization, using data, ordering, logging/plotting, and quick reference.
- Why it matters: Migration docs can help Codex translate user expectations from other backtesting frameworks into LEAN idioms.
- Gotchas to investigate later: Directly porting Zipline lifecycle assumptions, order semantics, data access patterns, calendar behavior, and logging/plotting differences.
- Important pages:
  - Zipline Migration: https://www.quantconnect.com/docs/v2/writing-algorithms/migrations/zipline
  - Initialization: https://www.quantconnect.com/docs/v2/writing-algorithms/migrations/zipline/initialization
  - Using Data: https://www.quantconnect.com/docs/v2/writing-algorithms/migrations/zipline/using-data
  - Ordering: https://www.quantconnect.com/docs/v2/writing-algorithms/migrations/zipline/ordering
  - Logging and Plotting: https://www.quantconnect.com/docs/v2/writing-algorithms/migrations/zipline/logging-and-plotting
  - Quick Reference: https://www.quantconnect.com/docs/v2/writing-algorithms/migrations/zipline/quick-reference

## Access Notes

- The Writing Algorithms index page was accessible and provided the section tree.
- Top-level section pages were sampled to confirm stable URLs.
- This pass did not open every individual dataset, indicator, option strategy, brokerage, or asset-class subpage. Those areas are large and should be researched selectively when they become relevant to AGENTS.md guidance.
- No QuantConnect MCP tools were used.
