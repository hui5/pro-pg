FROM supabase/postgres:0.13.0

COPY 00-initial-schema.sql /docker-entrypoint-initdb.d/00-initial-schema.sql
COPY auth-schema.sql /docker-entrypoint-initdb.d/01-auth-schema.sql
COPY base-schema.sql /docker-entrypoint-initdb.d/02-base-schema.sql
COPY base-config.sql /docker-entrypoint-initdb.d/03-base-config.sql
COPY dvdrental.sql /docker-entrypoint-initdb.d/04-dvdrental.sql


# Run time values
ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_PORT=5432

EXPOSE 5432
