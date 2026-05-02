# Quantitative Research Data Analysis

This area is for analyzing JSON, CSV, parquet, and other structured data used in quantitative trading research.

The purpose is broader than backtest performance review. Some data may come from QuantConnect backtests used as data-generation jobs, but this area is intended for reusable quantitative research and data analysis across many possible sources.

## Directory Layout

- `raw/` stores exported source data such as JSON, CSV, parquet, or other structured files.
- `scripts/` stores reusable analysis utilities.
- `reports/` stores generated Markdown summaries and findings.
- `notebooks/` stores optional exploratory notebooks.

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
