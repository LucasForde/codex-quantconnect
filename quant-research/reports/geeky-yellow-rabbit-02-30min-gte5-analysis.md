# Geeky Yellow Rabbit 02: 30-Minute Percent >= 5 Analysis

Source file: `quant-research/input/geeky-yellow-rabbit-02.json`

Analysis date: 2026-05-01

## Question

Find records where `30 minutes percent >= 5` and determine what, if anything, those records have in common in terms of:

- `Volume`
- `Dollar volume`
- `Market cap`

## Dataset Summary

- Total records: 5,000
- Records with `30 minutes percent >= 5`: 240
- Base hit rate: 4.8%

## Main Finding

The strongest common feature is **lower market cap**. The qualifying records are meaningfully concentrated in smaller companies.

There is also a secondary pattern of **higher share volume**. High-volume records have a higher hit rate than low-volume records.

`Dollar volume` is much less distinctive on its own. Its distribution for the qualifying records is close to the overall dataset, which suggests it is not a strong standalone separator in this sample.

## Distribution Comparison

| Field | Group | Mean | Median | 25th pct | 75th pct | 90th pct |
|---|---:|---:|---:|---:|---:|---:|
| Volume | All records | 3,044,207 | 708,648 | 297,412 | 1,777,968 | 5,006,573 |
| Volume | `30 minutes percent >= 5` | 6,409,225 | 1,249,751 | 404,709 | 3,650,422 | 13,445,227 |
| Dollar volume | All records | 38,393,034 | 4,352,006 | 1,201,979 | 18,946,319 | 71,096,947 |
| Dollar volume | `30 minutes percent >= 5` | 39,159,519 | 4,526,667 | 1,121,596 | 23,504,388 | 114,938,965 |
| Market cap | All records | 1,407,002,014 | 351,609,965 | 125,394,241 | 1,126,581,461 | 3,431,649,040 |
| Market cap | `30 minutes percent >= 5` | 843,991,093 | 147,054,620 | 48,993,422 | 441,914,491 | 1,754,242,293 |

## Hit Rate by Quartile

Quartiles are calculated from all 5,000 records.

| Field | Bucket | Records | Hits | Hit rate |
|---|---:|---:|---:|---:|
| Volume | <= 297,412 | 1,250 | 44 | 3.52% |
| Volume | 297,412 to 708,648 | 1,250 | 42 | 3.36% |
| Volume | 708,648 to 1,777,968 | 1,250 | 50 | 4.00% |
| Volume | > 1,777,968 | 1,250 | 104 | 8.32% |
| Dollar volume | <= 1,201,979 | 1,250 | 61 | 4.88% |
| Dollar volume | 1,201,979 to 4,352,006 | 1,250 | 57 | 4.56% |
| Dollar volume | 4,352,006 to 18,946,319 | 1,250 | 55 | 4.40% |
| Dollar volume | > 18,946,319 | 1,250 | 67 | 5.36% |
| Market cap | <= 125,394,241 | 1,250 | 115 | 9.20% |
| Market cap | 125,394,241 to 351,609,965 | 1,250 | 52 | 4.16% |
| Market cap | 351,609,965 to 1,126,581,461 | 1,250 | 37 | 2.96% |
| Market cap | > 1,126,581,461 | 1,250 | 36 | 2.88% |

## Practical Threshold Checks

| Condition | Records | Hits | Hit rate | Share of all hits |
|---|---:|---:|---:|---:|
| Market cap < $50M | 552 | 63 | 11.41% | 26.25% |
| Market cap < $100M | 1,058 | 101 | 9.55% | 42.08% |
| Market cap < $250M | 2,017 | 153 | 7.59% | 63.75% |
| Volume >= 1M | 1,974 | 131 | 6.64% | 54.58% |
| Volume >= 2M | 1,126 | 89 | 7.90% | 37.08% |
| Volume >= 5M | 502 | 49 | 9.76% | 20.42% |
| Dollar volume >= $10M | 1,710 | 84 | 4.91% | 35.00% |
| Market cap < $250M and Volume >= 1M | 456 | 67 | 14.69% | 27.92% |
| Market cap < $250M and Volume >= 2M | 243 | 46 | 18.93% | 19.17% |
| Market cap < $100M and Volume >= 1M | 210 | 41 | 19.52% | 17.08% |
| Market cap < $100M and Volume >= 2M | 122 | 29 | 23.77% | 12.08% |

## Interpretation

The qualifying records are not defined by one universal threshold, but they are clearly tilted toward:

- Lower market caps, especially below $250M.
- Higher share volume, especially above 1M to 2M shares.
- Lower share prices, especially below $5 before the open.
- The combination of lower market cap and higher volume.

The base hit rate is 4.8%. That rises to:

- 9.55% for records with market cap below $100M.
- 9.76% for records with volume above 5M.
- 14.69% for records with market cap below $250M and volume above 1M.
- 23.77% for records with market cap below $100M and volume above 2M.

`Dollar volume` does not show the same clean separation. For example, records with dollar volume above $10M have a 4.91% hit rate, almost identical to the 4.8% base rate. This implies that share volume and market cap are more informative than dollar volume for this specific target condition.

## Additional Price Range Check

Price range appears to be another relevant factor. The qualifying records skew toward lower-priced names.

| Field | Group | Mean | Median | 25th pct | 75th pct | 90th pct |
|---|---:|---:|---:|---:|---:|---:|
| Previous close price | All records | 12.57 | 5.44 | 2.31 | 14.97 | 33.52 |
| Previous close price | `30 minutes percent >= 5` | 7.53 | 3.37 | 1.75 | 8.07 | 19.16 |
| Before open price | All records | 13.11 | 5.72 | 2.43 | 15.59 | 34.80 |
| Before open price | `30 minutes percent >= 5` | 7.82 | 3.50 | 1.82 | 8.42 | 20.39 |

Hit rate by `Before open price` range:

| Before open price range | Records | Hits | Hit rate | Share of all hits |
|---|---:|---:|---:|---:|
| $1 to $2 | 929 | 68 | 7.32% | 28.33% |
| $2 to $3 | 662 | 42 | 6.34% | 17.50% |
| $3 to $5 | 748 | 42 | 5.61% | 17.50% |
| $5 to $10 | 908 | 41 | 4.52% | 17.08% |
| $10 to $20 | 781 | 22 | 2.82% | 9.17% |
| $20 and above | 972 | 25 | 2.57% | 10.42% |

Simple combined checks:

| Condition | Records | Hits | Hit rate | Share of all hits |
|---|---:|---:|---:|---:|
| Before open price < $5 | 2,339 | 152 | 6.50% | 63.33% |
| Before open price >= $10 | 1,753 | 47 | 2.68% | 19.58% |
| Before open price < $5 and Volume >= 1M | 793 | 73 | 9.21% | 30.42% |
| Before open price < $5 and Market cap < $250M | 1,665 | 126 | 7.57% | 52.50% |
| Before open price < $5 and Market cap < $250M and Volume >= 1M | 385 | 53 | 13.77% | 22.08% |

This reinforces the earlier finding. The higher-probability subset is not just low market cap and high volume; it also leans toward lower-priced stocks. However, adding price to the market-cap and volume profile narrows the sample and does not outperform the stricter `Market cap < $100M and Volume >= 2M` condition from the earlier section.

## Conclusion

Records where `30 minutes percent >= 5` most commonly appear in **small-cap, lower-priced names with unusually high share volume**.

The most useful simple profile from this dataset is:

> Low market cap plus elevated share volume, with lower price range as an additional supporting factor.

This should be treated as an exploratory finding, not a trading rule. A next step would be to test whether the same pattern holds across other files, dates, market regimes, and source datasets.
