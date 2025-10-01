# Writing Efficient DuneSQL Queries

Writing efficient queries is crucial for optimal performance on Dune, especially with the upcoming Fluid Engine. This guide provides practical do's and don'ts specifically tailored to DuneSQL and Dune's architecture.

## Key Principles

Dune's query engine is optimized for blockchain data analysis with time-partitioned tables and columnar storage. Understanding these architectural decisions will help you write queries that execute faster and consume fewer resources.

## ✅ DO's: Query Optimization Best Practices

### 1. **DO** Leverage Time-Based Partitioning with `block_time`

Dune partitions most tables by `block_time`. Always include time filters to enable partition pruning.

```sql
-- ✅ GOOD: Filters by block_time to enable partition pruning
SELECT 
    transaction_hash,
    from_address,
    to_address,
    value
FROM ethereum.transactions
WHERE block_time >= TIMESTAMP '2024-10-01 00:00:00'
  AND block_time < TIMESTAMP '2024-10-02 00:00:00'
  AND to_address = '0xa0b86a33e6842d6ba8a977b96b4ba0b76b0e3a0e'
```

### 2. **DO** Select Only Required Columns

Specify only the columns you need. Dune's columnar storage makes this especially effective.

```sql
-- ✅ GOOD: Selects only necessary columns
SELECT 
    evt_block_time,
    "from",
    "to", 
    value
FROM erc20_ethereum.evt_Transfer
WHERE contract_address = '0xa0b86a33e6842d6ba8a977b96b4ba0b76b0e3a0e'
  AND evt_block_time >= NOW() - INTERVAL '7' DAY
```

### 3. **DO** Use Efficient JOIN Strategies

Put time filters in the ON clause and join on indexed columns when possible.

```sql
-- ✅ GOOD: Efficient join with time filter in ON clause
SELECT 
    t.transaction_hash,
    t.block_time,
    l.topic0,
    l.data
FROM ethereum.transactions t
INNER JOIN ethereum.logs l 
    ON t.transaction_hash = l.transaction_hash
    AND t.block_time >= TIMESTAMP '2024-10-01'
    AND t.block_time < TIMESTAMP '2024-10-02'
WHERE t.to_address = '0xa0b86a33e6842d6ba8a977b96b4ba0b76b0e3a0e'
```

### 4. **DO** Use Address Filters Effectively

When filtering by contract addresses, use the most selective filter first.

```sql
-- ✅ GOOD: Contract address filter enables efficient data access
SELECT 
    evt_block_time,
    "from",
    "to",
    value
FROM erc20_ethereum.evt_Transfer
WHERE contract_address = '0xa0b86a33e6842d6ba8a977b96b4ba0b76b0e3a0e'  -- Most selective first
  AND evt_block_time >= TIMESTAMP '2024-10-01'
  AND value > 1000000000000000000  -- 1 ETH
```

### 5. **DO** Use CTEs for Complex Logic

Break complex queries into readable Common Table Expressions.

```sql
-- ✅ GOOD: Using CTEs for better performance and readability
WITH daily_volumes AS (
    SELECT 
        DATE(evt_block_time) as trade_date,
        SUM(amount_usd) as daily_volume
    FROM dex.trades
    WHERE blockchain = 'ethereum'
      AND block_time >= TIMESTAMP '2024-09-01'
      AND block_time < TIMESTAMP '2024-10-01'
    GROUP BY DATE(evt_block_time)
),
volume_metrics AS (
    SELECT 
        trade_date,
        daily_volume,
        AVG(daily_volume) OVER (
            ORDER BY trade_date 
            ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
        ) as rolling_7day_avg
    FROM daily_volumes
)
SELECT * FROM volume_metrics
ORDER BY trade_date DESC
```

### 6. **DO** Use LIMIT with Large Result Sets

Always use LIMIT when you don't need all results, especially for exploratory queries.

```sql
-- ✅ GOOD: Using LIMIT for large result sets
SELECT 
    transaction_hash,
    block_time,
    gas_used,
    gas_price
FROM ethereum.transactions
WHERE block_time >= TIMESTAMP '2024-10-01'
ORDER BY gas_price DESC
LIMIT 1000
```

## ❌ DON'Ts: Query Anti-Patterns to Avoid

### 1. **DON'T** Use `SELECT *` on Large Tables

Avoid selecting all columns, especially on transaction and log tables.

```sql
-- ❌ BAD: Selects all columns unnecessarily
SELECT * 
FROM ethereum.transactions
WHERE block_time >= TIMESTAMP '2024-10-01'

-- ✅ GOOD: Select only needed columns
SELECT transaction_hash, from_address, to_address, value
FROM ethereum.transactions  
WHERE block_time >= TIMESTAMP '2024-10-01'
```

### 2. **DON'T** Query Without Time Filters

Avoid queries that scan the entire table history.

```sql
-- ❌ BAD: No time filter - scans entire table
SELECT COUNT(*)
FROM ethereum.transactions
WHERE to_address = '0xa0b86a33e6842d6ba8a977b96b4ba0b76b0e3a0e'

-- ✅ GOOD: Include time filter for partition pruning
SELECT COUNT(*)
FROM ethereum.transactions
WHERE to_address = '0xa0b86a33e6842d6ba8a977b96b4ba0b76b0e3a0e'
  AND block_time >= TIMESTAMP '2024-10-01'
```

### 3. **DON'T** Use Functions in WHERE Clauses on Time Columns

Functions prevent partition pruning on `block_time`.

```sql
-- ❌ BAD: DATE function prevents partition pruning
SELECT *
FROM ethereum.transactions
WHERE DATE(block_time) = '2024-10-01'

-- ✅ GOOD: Use range filters instead
SELECT *
FROM ethereum.transactions
WHERE block_time >= TIMESTAMP '2024-10-01 00:00:00'
  AND block_time < TIMESTAMP '2024-10-02 00:00:00'
```

### 4. **DON'T** Use Inefficient String Operations

Avoid LIKE patterns that start with wildcards.

```sql
-- ❌ BAD: Leading wildcard prevents index usage
SELECT *
FROM ethereum.logs
WHERE topic0 LIKE '%Transfer%'

-- ✅ GOOD: Use specific hex values or exact matches
SELECT *
FROM ethereum.logs  
WHERE topic0 = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'  -- Transfer event
```

### 5. **DON'T** Create Unnecessary Subqueries

Avoid nested subqueries when JOINs or window functions work better.

```sql
-- ❌ BAD: Inefficient correlated subquery
SELECT 
    block_number,
    transaction_count,
    (SELECT AVG(transaction_count) 
     FROM ethereum.blocks b2 
     WHERE b2.block_number <= b1.block_number 
       AND b2.block_number > b1.block_number - 100) as avg_100_blocks
FROM ethereum.blocks b1
WHERE block_time >= TIMESTAMP '2024-10-01'

-- ✅ GOOD: Use window functions instead
SELECT 
    block_number,
    transaction_count,
    AVG(transaction_count) OVER (
        ORDER BY block_number 
        ROWS BETWEEN 99 PRECEDING AND CURRENT ROW
    ) as avg_100_blocks
FROM ethereum.blocks
WHERE block_time >= TIMESTAMP '2024-10-01'
```

### 6. **DON'T** Use ORDER BY Without LIMIT on Large Results

Sorting large result sets is expensive.

```sql
-- ❌ BAD: Ordering large result set without limit
SELECT transaction_hash, gas_price
FROM ethereum.transactions
WHERE block_time >= TIMESTAMP '2024-10-01'
ORDER BY gas_price DESC

-- ✅ GOOD: Add LIMIT when ordering
SELECT transaction_hash, gas_price
FROM ethereum.transactions
WHERE block_time >= TIMESTAMP '2024-10-01'
ORDER BY gas_price DESC
LIMIT 10000
```

## Advanced Optimization Techniques

### Use Spell Tables for Enhanced Metadata

Leverage Dune's spell tables which are pre-computed and optimized.

```sql
-- ✅ GOOD: Using optimized spell tables
SELECT 
    blockchain,
    project,
    SUM(amount_usd) as volume
FROM dex.trades
WHERE block_time >= TIMESTAMP '2024-10-01'
  AND block_time < TIMESTAMP '2024-11-01'
  AND blockchain = 'ethereum'
GROUP BY blockchain, project
ORDER BY volume DESC
```

### Optimize Window Functions

Use appropriate window frames to limit computation.

```sql
-- ✅ GOOD: Efficient window function with proper frame
SELECT 
    block_time,
    gas_used,
    AVG(gas_used) OVER (
        ORDER BY block_time
        ROWS BETWEEN 99 PRECEDING AND CURRENT ROW
    ) as rolling_avg_gas
FROM ethereum.blocks
WHERE block_time >= TIMESTAMP '2024-10-01'
ORDER BY block_time
```

## Query Performance Monitoring

- Monitor query execution time in the Dune interface
- Check the query plan for full table scans
- Use query result caching when appropriate
- Consider query complexity vs. result value trade-offs

## Summary

Efficient DuneSQL queries on Dune require understanding the platform's time-partitioned architecture. Focus on:

1. **Time filtering** with `block_time` for partition pruning
2. **Column selection** to leverage columnar storage  
3. **Strategic joins** with proper filter placement
4. **Avoiding anti-patterns** that prevent optimizations

Following these practices will ensure your queries run efficiently, especially as Dune continues to scale with Fluid Engine.