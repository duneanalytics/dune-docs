---
  title: 'Dune Typescript SDK'
---

# Classes
## ColumnType function


### Boolean


### Double


### Integer


### Timestamp


### Varchar



## ContentType function
All supported API content types

### Csv


### Json


### NDJson



## ExecutionState function


### CANCELLED


### COMPLETED


### EXECUTING


### EXPIRED


### FAILED


### PENDING



## ParameterType function


### DATE


### ENUM


### NUMBER


### TEXT



## QueryEngine function


### Large


### Medium



## DuneClient function
The primary interface for devs to utilize
full functionality of the Dune API.

### constructor


<ParamField path="apiKey" type="">

</ParamField>
### exec


### query


### table


### _runInner


<ParamField path="queryID" type="">

</ParamField>
<ParamField path="params" type="">

</ParamField>
<ParamField path="pingFrequency" type="">

</ParamField>
### downloadCSV


<ParamField path="args" type="">

</ParamField>
<ParamField path="outFile" type="text">
location to save CSV.
</ParamField>
### getLatestResult


<ParamField path="args" type="">

</ParamField>
### refresh


<ParamField path="queryID" type="">

</ParamField>
<ParamField path="parameters" type="">

</ParamField>
<ParamField path="pingFrequency" type="">

</ParamField>
### runQuery


<ParamField path="args" type="">

</ParamField>
### runQueryCSV


<ParamField path="args" type="">

</ParamField>
### runSql


<ParamField path="args" type="">

</ParamField>

## DuneError function


### constructor


<ParamField path="msg" type="">

</ParamField>
### message


### name


### stack


### prepareStackTrace
Optional override for formatting stack traces

### stackTraceLimit


### captureStackTrace


<ParamField path="targetObject" type="">

</ParamField>
<ParamField path="constructorOpt" type="">

</ParamField>

## ExecutionAPI function
This class implements all the routes defined in the Dune API Docs:
https://docs.dune.com/api-reference/executions/execution-object

### constructor


<ParamField path="apiKey" type="">

</ParamField>
<ParamField path="apiVersion" type="">

</ParamField>
### _delete


<ParamField path="route" type="">

</ParamField>
### _fetchEntireResult


<ParamField path="results" type="">

</ParamField>
### _fetchEntireResultCSV


<ParamField path="results" type="">

</ParamField>
### _get


<ParamField path="route" type="">

</ParamField>
<ParamField path="params" type="">

</ParamField>
<ParamField path="raw" type="">

</ParamField>
### _getByUrl


<ParamField path="url" type="">

</ParamField>
<ParamField path="params" type="">

</ParamField>
<ParamField path="raw" type="">

</ParamField>
### _handleResponse


<ParamField path="responsePromise" type="">

</ParamField>
### _patch


<ParamField path="route" type="">

</ParamField>
<ParamField path="params" type="">

</ParamField>
### _request


<ParamField path="method" type="">

</ParamField>
<ParamField path="url" type="">

</ParamField>
<ParamField path="payload" type="">

</ParamField>
<ParamField path="raw" type="">

</ParamField>
<ParamField path="content_type" type="">

</ParamField>
### buildCSVResponse


<ParamField path="response" type="">

</ParamField>
### cancelExecution


<ParamField path="executionId" type="text">
string representig ID of query execution.
</ParamField>
### execute


<ParamField path="queryID" type="">

</ParamField>
<ParamField path="parameters" type="">

</ParamField>
### executeQuery


<ParamField path="queryID" type="text">
id of query to be executed.
</ParamField>
<ParamField path="params" type="text">
including query parameters and execution performance.
</ParamField>
### getExecutionResults


<ParamField path="executionId" type="text">
string representig ID of query execution
</ParamField>
<ParamField path="params" type="text">
including limit, offset
</ParamField>
### getExecutionStatus


<ParamField path="executionId" type="text">
string representig ID of query execution.
</ParamField>
### getLastExecutionResults


<ParamField path="queryId" type="">

</ParamField>
<ParamField path="params" type="text">
parameters for retrieval.
</ParamField>
<ParamField path="expiryAgeHours" type="text">
What is considered to be an expired result set.
</ParamField>
### getLastResultCSV


<ParamField path="queryId" type="">

</ParamField>
<ParamField path="params" type="text">
parameters for retrieval.
</ParamField>
### getResult


<ParamField path="jobID" type="">

</ParamField>
### getResultCSV


<ParamField path="executionId" type="text">
string representig ID of query execution.
</ParamField>
<ParamField path="params" type="text">
including limit, offset
</ParamField>
### getStatus


<ParamField path="jobID" type="">

</ParamField>
### post


<ParamField path="route" type="text">
request path of the http post
</ParamField>
<ParamField path="params" type="text">
payload sent with request (should be aligned with what the interface supports)
</ParamField>
<ParamField path="content_type" type="">

</ParamField>
### url


<ParamField path="route" type="">

</ParamField>

## QueryAPI function
Query Management Interface (CRUD operations)
https://docs.dune.com/api-reference/queries/endpoint/query-object

### constructor


<ParamField path="apiKey" type="">

</ParamField>
<ParamField path="apiVersion" type="">

</ParamField>
### _delete


<ParamField path="route" type="">

</ParamField>
### _get


<ParamField path="route" type="">

</ParamField>
<ParamField path="params" type="">

</ParamField>
<ParamField path="raw" type="">

</ParamField>
### _getByUrl


<ParamField path="url" type="">

</ParamField>
<ParamField path="params" type="">

</ParamField>
<ParamField path="raw" type="">

</ParamField>
### _handleResponse


<ParamField path="responsePromise" type="">

</ParamField>
### _patch


<ParamField path="route" type="">

</ParamField>
<ParamField path="params" type="">

</ParamField>
### _request


<ParamField path="method" type="">

</ParamField>
<ParamField path="url" type="">

</ParamField>
<ParamField path="payload" type="">

</ParamField>
<ParamField path="raw" type="">

</ParamField>
<ParamField path="content_type" type="">

</ParamField>
### archiveQuery


<ParamField path="queryId" type="text">
ID of the query to be archived.
</ParamField>
### createQuery


<ParamField path="params" type="text">
of query creation.
</ParamField>
### makePrivate


<ParamField path="queryId" type="text">
ID of the query to be made private.
</ParamField>
### makePublic


<ParamField path="queryId" type="text">
ID of the query to be made public.
</ParamField>
### post


<ParamField path="route" type="text">
request path of the http post
</ParamField>
<ParamField path="params" type="text">
payload sent with request (should be aligned with what the interface supports)
</ParamField>
<ParamField path="content_type" type="">

</ParamField>
### readQuery


<ParamField path="queryId" type="text">
the ID of the query to be read.
</ParamField>
### unarchiveQuery


<ParamField path="queryId" type="text">
ID of the query to be unarchived.
</ParamField>
### updateQuery


<ParamField path="queryId" type="text">
the ID of the query to be updated.
</ParamField>
<ParamField path="params" type="">

</ParamField>
### url


<ParamField path="route" type="">

</ParamField>

## QueryParameter function


### constructor


<ParamField path="type" type="">

</ParamField>
<ParamField path="name" type="">

</ParamField>
<ParamField path="value" type="">

</ParamField>
### name


### type


### value


### date


<ParamField path="name" type="text">
of parameter
</ParamField>
<ParamField path="value" type="text">
default value
</ParamField>
### enum


<ParamField path="name" type="text">
of parameter
</ParamField>
<ParamField path="value" type="text">
default value
</ParamField>
### number


<ParamField path="name" type="text">
of parameter
</ParamField>
<ParamField path="value" type="text">
default value
</ParamField>
### text


<ParamField path="name" type="text">
of parameter
</ParamField>
<ParamField path="value" type="text">
default value
</ParamField>
### unravel


<ParamField path="params" type="text">
[Optional]: list of query parameters to be &quot;unravelled&quot;.
</ParamField>

## GetStatusResponse function



## RequestPayload function



## SuccessResponse function



## UploadCSVArgs function



## concatResultCSV function



## concatResultResponse function



## payloadJSON function



## payloadSearchParams function



## validateAndBuildGetResultParams function




# Objects
## BaseCRUDParams


<ParamField path="description" type="">

</ParamField>
<ParamField path="name" type="">

</ParamField>
<ParamField path="query_parameters" type="">

</ParamField>
<ParamField path="query_sql" type="">

</ParamField>

## CreateQueryParams


<ParamField path="description" type="">

</ParamField>
<ParamField path="is_private" type="">

</ParamField>
<ParamField path="name" type="">

</ParamField>
<ParamField path="query_parameters" type="">

</ParamField>
<ParamField path="query_sql" type="">

</ParamField>

## CreateQueryResponse


<ParamField path="query_id" type="">

</ParamField>

## CreateTableArgs


<ParamField path="description" type="">

</ParamField>
<ParamField path="is_private" type="">

</ParamField>
<ParamField path="namespace" type="">

</ParamField>
<ParamField path="schema" type="">

</ParamField>
<ParamField path="table_name" type="">

</ParamField>

## CreateTableResult


<ParamField path="example_query" type="">

</ParamField>
<ParamField path="full_name" type="">

</ParamField>
<ParamField path="namespace" type="">

</ParamField>
<ParamField path="table_name" type="">

</ParamField>

## DeleteTableArgs


<ParamField path="namespace" type="">

</ParamField>
<ParamField path="table_name" type="">

</ParamField>

## DeleteTableResult


<ParamField path="message" type="">

</ParamField>

## DuneQuery
Enriched structure representing all data constituting a DuneQuery.
Modeling the CRUD operation response for &#x27;get_query&#x27;
https://docs.dune.com/api-reference/queries/endpoint/read#example-return

<ParamField path="description" type="text">
Description of the query.
</ParamField>
<ParamField path="is_archived" type="text">
Indicates if the query is archived.
Note: This is as close as a user can get to deleting a query.
</ParamField>
<ParamField path="is_private" type="text">
Indicates if the query is private.
</ParamField>
<ParamField path="is_unsaved" type="text">
Indicates if the query is unsaved.
</ParamField>
<ParamField path="name" type="text">
Name of the query.
</ParamField>
<ParamField path="owner" type="text">
Dune user who owns the query.
</ParamField>
<ParamField path="parameters" type="text">
Parameters with their names and default values.
</ParamField>
<ParamField path="query_engine" type="text">
The query engine used to execute the query.
</ParamField>
<ParamField path="query_id" type="text">
Unique identifier of the query.
</ParamField>
<ParamField path="query_sql" type="text">
Raw SQL of the query.
</ParamField>
<ParamField path="tags" type="text">
Tags associated with the query.
</ParamField>
<ParamField path="version" type="text">
Version of the query.
</ParamField>

## ExecuteQueryParams


<ParamField path="performance" type="">

</ParamField>
<ParamField path="query_parameters" type="">

</ParamField>

## ExecutionParams


<ParamField path="performance" type="">

</ParamField>
<ParamField path="query_parameters" type="">

</ParamField>

## ExecutionResponse


<ParamField path="execution_id" type="">

</ParamField>
<ParamField path="state" type="">

</ParamField>

## ExecutionResponseCSV


<ParamField path="data" type="">

</ParamField>
<ParamField path="next_offset" type="">

</ParamField>
<ParamField path="next_uri" type="">

</ParamField>

## ExecutionResult


<ParamField path="metadata" type="">

</ParamField>
<ParamField path="rows" type="">

</ParamField>

## GetResultParams


<ParamField path="columns" type="">

</ParamField>
<ParamField path="filters" type="">

</ParamField>
<ParamField path="limit" type="">

</ParamField>
<ParamField path="offset" type="">

</ParamField>
<ParamField path="query_parameters" type="">

</ParamField>
<ParamField path="sample_count" type="">

</ParamField>
<ParamField path="sort_by" type="">

</ParamField>

## InsertTableArgs


<ParamField path="content_type" type="">

</ParamField>
<ParamField path="data" type="">

</ParamField>
<ParamField path="namespace" type="">

</ParamField>
<ParamField path="table_name" type="">

</ParamField>

## InsertTableResult


<ParamField path="rows_written" type="">

</ParamField>

## LatestResultArgs


<ParamField path="opts" type="">

</ParamField>
<ParamField path="parameters" type="">

</ParamField>
<ParamField path="queryId" type="">

</ParamField>

## LatestResultsResponse


<ParamField path="isExpired" type="">

</ParamField>
<ParamField path="results" type="">

</ParamField>

## Options


<ParamField path="batchSize" type="">

</ParamField>
<ParamField path="maxAgeHours" type="">

</ParamField>
<ParamField path="pingFrequency" type="">

</ParamField>

## ResultMetadata


<ParamField path="column_names" type="">

</ParamField>
<ParamField path="datapoint_count" type="">

</ParamField>
<ParamField path="execution_time_millis" type="">

</ParamField>
<ParamField path="pending_time_millis" type="">

</ParamField>
<ParamField path="result_set_bytes" type="">

</ParamField>
<ParamField path="row_count" type="">

</ParamField>
<ParamField path="total_result_set_bytes" type="">

</ParamField>
<ParamField path="total_row_count" type="">

</ParamField>

## ResultsResponse


<ParamField path="cancelled_at" type="">

</ParamField>
<ParamField path="execution_ended_at" type="">

</ParamField>
<ParamField path="execution_id" type="">

</ParamField>
<ParamField path="execution_started_at" type="">

</ParamField>
<ParamField path="expires_at" type="">

</ParamField>
<ParamField path="is_execution_finished" type="">

</ParamField>
<ParamField path="next_offset" type="">

</ParamField>
<ParamField path="next_uri" type="">

</ParamField>
<ParamField path="query_id" type="">

</ParamField>
<ParamField path="result" type="">

</ParamField>
<ParamField path="state" type="">

</ParamField>
<ParamField path="submitted_at" type="">

</ParamField>

## RunQueryArgs


<ParamField path="columns" type="">

</ParamField>
<ParamField path="filters" type="">

</ParamField>
<ParamField path="limit" type="">

</ParamField>
<ParamField path="offset" type="">

</ParamField>
<ParamField path="opts" type="">

</ParamField>
<ParamField path="performance" type="">

</ParamField>
<ParamField path="queryId" type="">

</ParamField>
<ParamField path="query_parameters" type="">

</ParamField>
<ParamField path="sample_count" type="">

</ParamField>
<ParamField path="sort_by" type="">

</ParamField>

## RunSqlArgs


<ParamField path="archiveAfter" type="">

</ParamField>
<ParamField path="isPrivate" type="">

</ParamField>
<ParamField path="name" type="">

</ParamField>
<ParamField path="opts" type="">

</ParamField>
<ParamField path="performance" type="">

</ParamField>
<ParamField path="query_parameters" type="">

</ParamField>
<ParamField path="query_sql" type="">

</ParamField>

## SchemaRecord


<ParamField path="name" type="">

</ParamField>
<ParamField path="type" type="">

</ParamField>

## TimeData


<ParamField path="cancelled_at" type="">

</ParamField>
<ParamField path="execution_ended_at" type="">

</ParamField>
<ParamField path="execution_started_at" type="">

</ParamField>
<ParamField path="expires_at" type="">

</ParamField>
<ParamField path="submitted_at" type="">

</ParamField>

## UpdateQueryParams


<ParamField path="description" type="">

</ParamField>
<ParamField path="name" type="">

</ParamField>
<ParamField path="query_parameters" type="">

</ParamField>
<ParamField path="query_sql" type="">

</ParamField>
<ParamField path="tags" type="">

</ParamField>


