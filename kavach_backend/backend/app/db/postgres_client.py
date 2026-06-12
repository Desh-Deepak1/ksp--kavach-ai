import psycopg2
from psycopg2.extras import RealDictCursor
from backend.app.core.config import settings

class PostgresClient:
    def __init__(self):
        self.conn_string = (
            f"dbname='{settings.POSTGRES_DB}' "
            f"user='{settings.POSTGRES_USER}' "
            f"password='{settings.POSTGRES_PASSWORD}' "
            f"host='{settings.POSTGRES_HOST}' "
            f"port='{settings.POSTGRES_PORT}'"
        )

    def get_connection(self):
        # Establish a secure transaction block bound directly to the local cluster network
        return psycopg2.connect(self.conn_string)

    def fetch_user_by_username(self, username: str) -> dict | None:
        query = """
            SELECT id, username, password_hash, rank_role, station_id, subdivision_scope 
            FROM users_core 
            WHERE username = %s;
        """
        with self.get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cursor:
                # Parameterized to prevent SQL injection vulnerabilities
                cursor.execute(query, (username,))
                return cursor.fetchone()

    def write_audit_log(self, user_id: str, username: str, rank_role: str, action: str, query_hash: str, station_id: str):
        query = """
            INSERT INTO immutable_audit 
            (user_id, username, rank_role, action_performed, query_intent_hash, accessed_station_context) 
            VALUES (%s, %s, %s, %s, %s, %s);
        """
        with self.get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(query, (user_id, username, rank_role, action, query_hash, station_id))
                conn.commit()

pg_client = PostgresClient()