## DuneClient 
The primary interface for devs to utilize
full functionality of the Dune API.

### constructor
Constructor for the DuneClient.

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
Get the lastest execution results in CSV format and saves to disk.

<ParamField path="args" type="">

</ParamField>
<ParamField path="outFile" type="text">
location to save CSV.
</ParamField>
### getLatestResult
Goes a bit beyond the internal call which returns that last execution results.
Here contains additional logic to refresh the results if they are too old.

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
Runs an existing query by ID via execute, await, return results.

<ParamField path="args" type="">

</ParamField>
### runQueryCSV
Runs an existing query by ID via execute, await, return Result CSV.

<ParamField path="args" type="">

</ParamField>
### runSql
Allows user to provide execute raw_sql via the CRUD interface
- create, run, get results with optional archive/delete.
- Query is by default made private and archived after execution.
Requires Plus subscription!

<ParamField path="args" type="">

</ParamField>
