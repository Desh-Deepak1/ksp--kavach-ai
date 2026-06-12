import sys
import time
from opensearchpy import OpenSearch

# Establish explicit connection configuration profiles for our OpenSearch sandbox container
client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    use_ssl=False,
    verify_certs=False
)

# ---------------------------------------------------------------------------
# 1. SPECIFY VECTOR SPACE MAPPINGS FOR SEMANTIC SEARCH CAPABILITIES
# ---------------------------------------------------------------------------
index_name = "ksp_fir_narratives"

index_body = {
    "settings": {
        "index": {
            "knn": True,  # Enable explicit k-NN vector space extensions
            "refresh_interval": "1s"
        }
    },
    "mappings": {
        "properties": {
            "fir_id": {"type": "keyword"},
            "narrative_raw": {"type": "text", "analyzer": "standard"},
            "narrative_translated": {"type": "text", "analyzer": "standard"},
            # Vector Space Definition optimized for BGE-M3 (1024-dimensional space)
            "embedding_vector": {
                "type": "knn_vector",
                "dimension": 1024,
                "method": {
                    "name": "hnsw",
                    "space_type": "cosinesimil", # Using cosine similarity for cross-lingual matches
                    "engine": "nmslib"
                }
            }
        }
    }
}

def initialize_search_index():
    print(f"[*] Validating Index Context for target: {index_name}...")
    if client.indices.exists(index=index_name):
        print(f"[-] Index '{index_name}' already exists. Dropping old collections to ensure structural isolation...")
        client.indices.delete(index=index_name)
    
    response = client.indices.create(index=index_name, body=index_body)
    print(f"[+] Index creation confirmed: {response}")

if __name__ == "__main__":
    try:
        initialize_search_index()
    except Exception as e:
        print(f"[!] Initialization Failure: {str(e)}")
        sys.exit(1)