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
