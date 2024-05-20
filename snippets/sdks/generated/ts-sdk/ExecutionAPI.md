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
