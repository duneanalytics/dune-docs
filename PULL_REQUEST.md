# 📋 Docs Navigation Restructure — RFC

## Summary

This PR proposes a restructured navigation for docs.dune.com, moving from 7 top-level items to 6, organized around user workflows rather than product features.

## Goals

- Position Dune as an enterprise onchain data platform
- Reduce information overload with clearer pathways
- Build trust through methodology documentation in Data Catalog
- Give API documentation dedicated prominence for developers
- Align docs structure with how enterprise users think about data platforms

## Proposed Structure

| Current | Proposed |
|---------|----------|
| Get Started | → Welcome |
| Analytics Hub | → Access Methods → Web Application |
| Query Engine | → SQL Query Engine |
| Data Catalog | → Data Catalog (elevated with methodology) |
| APIs & Connectors | → **API Reference** (new top-level) + Access Methods → Connectors |
| Datashare | → Access Methods → Datashare |
| Catalyst | → Access Methods → Catalyst |

## New Top-Level Navigation

```
Welcome | Data Catalog | Access Methods | API Reference | SQL Query Engine | Resources
```

## Key Changes

### 1. Use Cases Front and Center
Protocol Analytics, Trading Intelligence, Stablecoin & Payments, Investor Reporting, Build Applications — all prominently featured in the Welcome section.

### 2. Data Catalog Rebuilt Around Trust
- Full methodology documentation for each curated table
- Data quality and freshness documentation
- Coverage matrix showing chains × data types
- Clear distinction between Curated, Spellbook, and Community data

### 3. API Reference as Dedicated Section
All Analytics API endpoints visible directly in sidebar with HTTP method badges:

```
API Reference
├── Overview / Getting Started / Authentication
│
├── Executions and Results
│   ├── [POST] Execute SQL
│   ├── [POST] Execute Query
│   ├── [POST] Execute Query Pipeline
│   ├── [GET]  Get Execution Status
│   ├── [GET]  Get Execution Result (JSON/CSV)
│   ├── [GET]  Get Latest Query Result (JSON/CSV)
│   └── [POST] Cancel Execution
│
├── Query Management (List, Create, Update, Read, Archive, Private)
├── Data Uploads (Upload CSV, Create/Insert/Clear/Delete Table)
├── Materialized Views (Get, Upsert, Delete, List, Refresh)
├── Pipelines / Account Management
├── Post-processing (Filtering, Sorting, Pagination, Sampling)
├── Webhooks
├── SDKs (Python, TypeScript, Go)
└── Resources (Rate Limits, Troubleshooting, Billing, FAQ)
```

### 4. Connectors Reorganized
Split into "Transform Data" (dbt) and "BI & Analytics Tools" (Trino for Hex, Tableau, etc.):

```
Connectors
├── Overview
├── Transform Data
│   └── dbt Connector (setup, building models, materialized views)
└── BI & Analytics Tools
    ├── Hex
    ├── Metabase
    ├── Tableau
    ├── Power BI
    ├── Looker
    ├── DBeaver
    └── Other Trino-Compatible Tools
```

### 5. Enterprise Language
No "wizard" jargon in navigation — feels like Snowflake/Bloomberg documentation.

### 6. Renamed Sections
- Overview → Welcome
- What is Dune → Introduction
- How Dune Works → Architecture Overview
- Freshness SLAs → Data Freshness
- SQL Reference → SQL Query Engine

## Files Created

This PR includes **~180 stub files** demonstrating the new navigation structure:

- `welcome/` — 16 files
- `data-catalog-new/` — ~45 files
- `access-methods/` — ~45 files
- `api-reference-new/` — ~45 files
- `sql-query-engine/` — ~25 files
- `resources/` — ~20 files
- `navigation-new.json` — New Mintlify navigation configuration

## Templates Used

Each stub file follows a consistent template with:
- Frontmatter (title, description)
- Brief description of intended content
- `[TODO: Content]` markers for pending content
- Status footer indicating stub status

API endpoint pages include additional structure:
- HTTP method and endpoint
- Request/response examples
- Parameter tables
- SDK examples

Curated table pages include methodology sections:
- Data sources
- Transformation logic
- What's included/excluded
- Schema documentation

## Feedback Requested

- [ ] Does this structure make sense for our users?
- [ ] Does API Reference deserve top-level placement?
- [ ] Are there sections that feel misplaced?
- [ ] What's missing?
- [ ] Concerns about migration/redirects?

## Not in Scope (Yet)

- Actual content migration
- Redirect mapping
- Visual design changes
- Updating the live `docs.json` (this is a proposal)

## Next Steps

1. Team review of proposed structure
2. Gather feedback from key stakeholders
3. Create redirect mapping from old to new URLs
4. Content migration plan
5. Phased rollout

---

cc: @[team members]

