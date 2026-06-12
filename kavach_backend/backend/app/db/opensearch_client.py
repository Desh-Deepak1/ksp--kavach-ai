from opensearchpy import OpenSearch
from backend.app.core.config import settings

class OpenSearchClient:
    def __init__(self):
        self.client = OpenSearch(
            hosts=[{'host': settings.OPENSEARCH_HOST, 'port': settings.OPENSEARCH_PORT}],
            use_ssl=False,
            verify_certs=False
        )

    def execute_vector_search(self, index_name: str, embedding_vector: list, limit: int = 3) -> list:
        # Build an isolated k-NN search body targeting our dense vector index space
        query_body = {
            "size": limit,
            "query": {
                "knn": {
                    "embedding_vector": {
                        "vector": embedding_vector,
                        "k": limit
                    }
                }
            },
            "_source": ["fir_id", "narrative_raw", "narrative_translated"]
        }
        response = self.client.search(body=query_body, index=index_name)
        hits = response.get("hits", {}).get("hits", [])
        return [hit["_source"] for hit in hits]

vector_client = OpenSearchClient()