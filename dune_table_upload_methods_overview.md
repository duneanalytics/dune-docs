# Dune Analytics Table Upload Methods: High-Level Overview

This document provides a comprehensive comparison of the two primary methods for uploading data tables to Dune Analytics, outlining their capabilities, limitations, and ideal use cases.

## Method 1: CSV Upload - Simple but Inflexible

### Overview
The CSV upload method is the most straightforward way to get data into Dune. It's designed for users who want quick and easy data uploads without complex setup requirements.

### How It Works
- **UI Upload**: Click "Upload Data" in Dune interface, select CSV file, name your table, add description, and save
- **API Upload**: Use the `/upload` endpoint to programmatically upload CSV files
- **Schema**: Automatically inferred from CSV data (no manual schema definition required)
- **Table Naming**: Results in `dune.team_name.dataset_name` format

### Key Characteristics

#### ✅ Advantages
- **Simplicity**: Minimal setup required - just upload and go
- **User-Friendly**: Perfect for non-technical users
- **Quick Start**: Immediate data availability for querying
- **Automatic Processing**: Schema inference handles data types automatically
- **Both UI and API**: Available through web interface or programmatic upload

#### ❌ Limitations
- **Size Constraint**: Maximum 200MB file size limit
- **No Incremental Updates**: Must replace entire table to update data
- **Limited Control**: Cannot modify schema after upload
- **File Format**: Only supports CSV format
- **Inflexible Schema**: Stuck with automatically inferred data types
- **No Append Operations**: Cannot add new rows to existing data

### Best Use Cases
- Small to medium datasets (under 200MB)
- One-time data uploads
- Static datasets that don't need frequent updates
- Prototyping and experimentation
- Users without programming experience

### Credit Usage
- Varies by plan tier
- Plus Plan: 5,000 data points per credit
- Premium Plan: 25,000 data points per credit

---

## Method 2: Programmatic Table Management - Flexible but Complex

### Overview
The programmatic approach uses a combination of four API endpoints (`create`, `insert`, `clear`, `delete`) to provide full control over table lifecycle and data management.

### Core Operations

#### 1. **Create Table** (`POST /v1/table/create`)
- Define table schema explicitly with column names, types, and nullability
- Set table as public or private
- Specify namespace and table name
- **Cost**: 10 credits per successful table creation

#### 2. **Insert Data** (`POST /v1/table/insert`)
- Add new rows to existing tables
- Support for incremental data loading
- Append operations without replacing existing data
- JSON payload with structured data

#### 3. **Clear Data** (`POST /v1/table/clear`)
- Remove all data from table while preserving schema
- Useful for complete data refreshes
- Table structure remains intact

#### 4. **Delete Table** (`DELETE /v1/table/delete`)
- Permanently remove table and all its data
- Complete cleanup operation
- Irreversible action

### Key Characteristics

#### ✅ Advantages
- **Full Control**: Complete management of table lifecycle
- **Incremental Updates**: Add data without replacing existing content
- **Large Data Support**: No 200MB size limitation
- **Custom Schema**: Define exact data types, constraints, and structure
- **Append Operations**: Add new rows while keeping existing data
- **Flexible Updates**: Clear and refresh data as needed
- **Programmatic**: Perfect for automated workflows and ETL pipelines
- **Privacy Control**: Set tables as public or private

#### ❌ Limitations
- **Complexity**: Requires more technical knowledge and setup
- **Schema Management**: Must manually define and maintain schema
- **Multiple API Calls**: Requires orchestration of multiple endpoints
- **Higher Learning Curve**: More complex implementation
- **Credit Consumption**: Table creation costs 10 credits

### Typical Workflow
1. **Create** table with defined schema
2. **Insert** initial data batch
3. **Insert** additional data as needed (append operations)
4. **Clear** table when full refresh is needed
5. **Insert** new complete dataset
6. **Delete** table when no longer needed

### Best Use Cases
- Large datasets (over 200MB)
- Frequently updated data requiring incremental loads
- Production ETL pipelines
- Applications needing precise schema control
- Automated data workflows
- Complex data structures with specific type requirements

---

## Comparison Matrix

| Aspect | CSV Upload | Programmatic Management |
|--------|------------|------------------------|
| **Complexity** | Low | High |
| **Setup Time** | Minutes | Hours/Days |
| **Size Limit** | 200MB | No limit |
| **Schema Control** | Automatic | Manual definition |
| **Update Method** | Replace entire table | Incremental appends |
| **API Calls Required** | 1 | Multiple (2-4) |
| **Learning Curve** | Minimal | Steep |
| **Automation Friendly** | Limited | Excellent |
| **Credit Cost** | Data points only | 10 credits + data points |
| **Privacy Options** | Public/Private | Public/Private |
| **Error Recovery** | Limited | Granular control |

---

## Decision Framework

### Choose CSV Upload When:
- Dataset is under 200MB
- Data updates are infrequent
- Quick prototyping or one-off analysis
- Non-technical user or minimal programming resources
- Simple data structure with standard types
- Time to market is critical

### Choose Programmatic Management When:
- Dataset exceeds 200MB
- Regular data updates required
- Part of automated data pipeline
- Need precise control over data types
- Building production applications
- Require incremental data loading
- Complex data workflows with dependencies

---

## Implementation Considerations

### Security & Authentication
Both methods require:
- Dune API key authentication
- Proper credential management
- Team/user context considerations

### Performance & Scalability
- **CSV Upload**: Limited by file size and processing time
- **Programmatic**: Scalable for large datasets, can handle concurrent operations

### Monitoring & Maintenance
- **CSV Upload**: Minimal monitoring needed
- **Programmatic**: Requires error handling, retry logic, and workflow orchestration

### Cost Management
- Both methods consume credits based on data volume
- Programmatic method has additional table creation costs
- Consider credit consumption in high-frequency update scenarios

---

## Conclusion

The choice between CSV upload and programmatic table management depends largely on your technical requirements, data volume, and update frequency. CSV upload excels in simplicity and speed for smaller, static datasets, while programmatic management provides the flexibility and control needed for enterprise-scale data operations.

For most users starting with Dune, CSV upload provides an excellent entry point. As data complexity and automation requirements grow, migrating to programmatic table management becomes advantageous for maintaining scalable, reliable data pipelines.
