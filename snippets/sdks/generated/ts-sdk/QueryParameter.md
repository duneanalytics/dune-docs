## QueryParameter 
Class representing Dune Query Parameters with convience constructor methods for each type.

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
Date type parameter constructor

<ParamField path="name" type="text">
of parameter
</ParamField>
<ParamField path="value" type="text">
default value
</ParamField>
### enum
Enum/List type parameter constructor

<ParamField path="name" type="text">
of parameter
</ParamField>
<ParamField path="value" type="text">
default value
</ParamField>
### number
Number type parameter constructor

<ParamField path="name" type="text">
of parameter
</ParamField>
<ParamField path="value" type="text">
default value
</ParamField>
### text
Text type parameter constructor

<ParamField path="name" type="text">
of parameter
</ParamField>
<ParamField path="value" type="text">
default value
</ParamField>
### unravel
Internal method used to convert query parameters into JSON formated request payload.

<ParamField path="params" type="text">
[Optional]: list of query parameters to be &quot;unravelled&quot;.
</ParamField>
