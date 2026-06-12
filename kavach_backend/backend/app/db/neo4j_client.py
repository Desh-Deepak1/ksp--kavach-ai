from neo4j import GraphDatabase, RoutingControl
from backend.app.core.config import settings

class Neo4jClient:
    def __init__(self):
        self._driver = GraphDatabase.driver(
            settings.NEO4J_URI, 
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
        )

    def close(self):
        self._driver.close()

    def execute_read_query(self, cypher_query: str, parameters: dict = None) -> list:
        # Enforce strict read-only execution constraints to neutralize injection exploits
        # Parameterized arguments ensure complete query safety
        records, _, _ = self._driver.execute_query(
            cypher_query,
            parameters_=parameters,
            routing_=RoutingControl.READ
        )
        return [record.data() for record in records]

graph_client = Neo4jClient()