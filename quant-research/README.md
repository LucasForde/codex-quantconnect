# Quantitative Research Data Analysis

This area is for analyzing JSON, CSV, parquet, and other structured data used in quantitative trading research.

The purpose is broader than backtest performance review. Some data may come from QuantConnect backtests used as data-generation jobs, but this area is intended for reusable quantitative research and data analysis across many possible sources.

## Directory Layout

- `input/` stores source datasets such as JSON, CSV, parquet, or other structured files.
- `output/` stores derived datasets generated from filters, transformations, or analysis steps.
- `scripts/` stores reusable analysis utilities.
- `reports/` stores generated Markdown summaries and findings.
- `notebooks/` stores optional exploratory notebooks.
- `table-app/` stores a local browser table viewer for JSON datasets.

## Table App

`table-app/` is a minimal static app for displaying JSON data as a full-width dark table. It intentionally has no visible controls; Codex drives it through Chrome DevTools MCP by opening `table-app/index.html` and injecting data into the browser.

Expected use:

- The user provides data in chat, names a JSON file from `input/` or `output/`, or asks for filtered/transformed data.
- Codex loads, filters, or transforms the data outside the page as needed.
- Codex renders rows with `window.JsonTableApp.setData(rows, options)`.
- When displaying table data, round numeric values to 2 decimal places unless the user asks for a different precision.

The app derives table columns from object keys. It also supports optional programmatic filtering and summary rows:

- `window.JsonTableApp.setData(rows, { columns, summaries })`
- `window.JsonTableApp.applyFilter(column, operator, value)`
- `window.JsonTableApp.resetFilter()`
- `window.JsonTableApp.setSummaries([{ label, values }])`
- `window.JsonTableApp.clearData()`

Supported filter operators are `contains`, `equals`, `notEquals`, `gt`, `gte`, `lt`, `lte`, `empty`, and `notEmpty`.

Design constraints:

- Dark background: `#272428`
- Column header background: `#221f22`
- Grid lines: `#19181a`
- Column header text: `#ff6188`
- Main table cell text: `#fcfcfa`
- Totals/averages row text: `#ffd866`
- Table viewport has `15px` padding, table corners use a `6px` radius, and scrollbars are styled dark.

## Possible Data Sources

Data may come from:

- QuantConnect runs, including backtests used as data-generation jobs
- Exported custom metrics
- Trade and event logs
- Market data files
- Broker or execution exports
- Third-party APIs
- Manually collected research datasets
- Other future research and data sources

## Analysis Uses

This area can be used for:

- Signal analysis
- Feature analysis
- Trade and event analysis
- Market regime analysis
- Data-quality checks
- Custom metrics
- Cross-source comparisons

## Relationship to Agent Guidance

Reusable lessons from analysis can later inform `templates/AGENTS.quantconnect.md` when they are general enough to help future QuantConnect / LEAN Python projects.

Raw data, generated reports, and project-specific findings should not be copied into the generic AGENTS file.
