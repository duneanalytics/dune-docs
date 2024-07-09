import dotenv, os
from dune_client.types import QueryParameter
from dune_client.client import DuneClient
from dune_client.query import QueryBase

# dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
# dotenv.load_dotenv(dotenv_path)
# dune = DuneClient.from_env()
dune = DuneClient(api_key="Jo7fq9GmW6Aa3z5nVDpgVkhshRaTZ5F5")

def execute_query(id, param1=None, param2=None, param3=None, param4=None):
    """
    we want a function that can execute any query with arbitrary params, so the rest of the script is less verbose

    you're expected to pass in tuples, so that we can dynamically name params as needed. Note that we should always stick to text type params to make this script easy to maintain.
    """
    params = []
    if param1 != None:
        params.append(QueryParameter.text_type(name=param1[0], value=param1[1]))
    if param2 != None:
        params.append(QueryParameter.text_type(name=param2[0], value=param2[1]))
    if param3 != None:
        params.append(QueryParameter.text_type(name=param3[0], value=param3[1]))
    if param4 != None:
        params.append(QueryParameter.text_type(name=param4[0], value=param4[1]))

    query = QueryBase(
        query_id=id,
        params=params
    )
    result = dune.execute_query(query = query, performance = "large")
    print(f'Query executed id "${id}" with ${param1}, ${param2}, ${param3}, ${param4} with execution #${result.execution_id}')

"""
We want to execute all query combinations based on this google doc https://docs.google.com/document/d/1ZmfDPJJBd7SD6aqwAq15E1GspQgNBdBi1KL_mFUA9fU/edit
"""

#create tuple combination of all blockchains/table names for raw and decoded tables
blockchains = ['sei']
table_names = ['blocks','creation_traces','logs','transactions','traces','contracts','logs_decoded','traces_decoded']
query_ids = [
            3424601 #COLUMN DESCRIPTIONS
            , 3419983 #TABLE SAMPLES
            ]
raw_decoded = [(query_id, blockchain, table_name) for blockchain in blockchains for table_name in table_names for query_id in query_ids]
for i in raw_decoded:
    execute_query(i[0], ('table_schema',i[1]), ('table_name',i[2]))

#curated tables are a bit more nested
curated = [('dex','trades'),('nft','trades'),('dex_aggregator','trades')]
for i in curated:
    execute_query(3424601, ('table_schema',i[0]), ('table_name',i[1])) #COLUMN DESCRIPTIONS
    for chain in blockchains:
        execute_query(3793075, ('table_schema',i[0]), ('table_name',i[1]), ('param_col', 'blockchain'), ('param_value',chain)) #TABLE SAMPLES https://dune.com/queries/3793075

#Project Coverage
query_ids = [3740060, 3762297, 3796770]
covered = [(query_id, blockchain) for blockchain in blockchains for query_id in query_ids]
for i in covered:
    execute_query(i[0], ('blockchain', i[1]))