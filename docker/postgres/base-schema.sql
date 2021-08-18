--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 12.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: base; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA base;


ALTER SCHEMA base OWNER TO postgres;

--
-- Name: refresh_meta(); Type: FUNCTION; Schema: base; Owner: postgres
--

CREATE FUNCTION base.refresh_meta() RETURNS void
    LANGUAGE plpgsql
    AS $$
begin
        refresh materialized view base.view;
        refresh materialized view base."column";
        refresh materialized view base.foreign_key;
        refresh materialized view base.primary_key;
    end
$$;


ALTER FUNCTION base.refresh_meta() OWNER TO postgres;

--
-- Name: refresh_meta_trigger(); Type: FUNCTION; Schema: base; Owner: postgres
--

CREATE FUNCTION base.refresh_meta_trigger() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
declare
    obj          record;
    need_refresh boolean = false;
begin
    for obj in select * from pg_event_trigger_ddl_commands()
        loop
            if obj.schema_name = 'public' then
                need_refresh = true;
                insert into base.ddl_command (command_tag, schema_name, object_type, object_identity)
                values (obj.command_tag, obj.schema_name, obj.object_type, obj.object_identity);
            end if;

        end loop;
    if need_refresh = true then
        perform base.refresh_meta();
    end if;
end;
$$;


ALTER FUNCTION base.refresh_meta_trigger() OWNER TO postgres;

--
-- Name: select(text, text); Type: FUNCTION; Schema: base; Owner: postgres
--

CREATE FUNCTION base."select"("table" text, field text) RETURNS TABLE(value text)
    LANGUAGE plpgsql
    AS $$
begin

    return query execute concat(format('select distinct %s::text from %s ', field, "table"),
                                format('order by %s limit 1000 ', field));


end
$$;


ALTER FUNCTION base."select"("table" text, field text) OWNER TO postgres;

--
-- Name: select_foreign(text, text, text[], text[]); Type: FUNCTION; Schema: base; Owner: postgres
--

CREATE FUNCTION base.select_foreign("table" text, field text, filter text[], "constraint" text[]) RETURNS TABLE(value integer, label text)
    LANGUAGE plpgsql
    AS $$
declare
    sql text;
begin
    raise notice '%s', filter;
    sql = concat(format('select distinct f.%s, f.%s::text ', field, filter[1]),
                 format('from %s f join %s t  on f.%s = t.%s ', "table", "constraint"[1], field, "constraint"[2]),
                 format('where f.%s ilike %L ', filter[1], filter[2]), "constraint"[3], ' limit 8 ');


     raise notice '%s', sql;

    return query execute sql;

end
$$;


ALTER FUNCTION base.select_foreign("table" text, field text, filter text[], "constraint" text[]) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: column; Type: MATERIALIZED VIEW; Schema: base; Owner: postgres
--

CREATE MATERIALIZED VIEW base."column" AS
 SELECT obj_description(((format('%s.%s'::text, col.table_schema, col.table_name))::regclass)::oid) AS table_description,
    col_description(((format('%s.%s'::text, col.table_schema, col.table_name))::regclass)::oid, (col.ordinal_position)::integer) AS description,
    array_to_json(ARRAY( SELECT enums.enumlabel
           FROM pg_enum enums
          WHERE (typ.oid = enums.enumtypid)
          ORDER BY enums.enumsortorder)) AS enums,
    col.table_catalog,
    col.table_schema,
    col.table_name,
    col.column_name,
    col.ordinal_position,
    col.column_default,
    col.is_nullable,
    col.data_type,
    col.character_maximum_length,
    col.character_octet_length,
    col.numeric_precision,
    col.numeric_precision_radix,
    col.numeric_scale,
    col.datetime_precision,
    col.interval_type,
    col.interval_precision,
    col.character_set_catalog,
    col.character_set_schema,
    col.character_set_name,
    col.collation_catalog,
    col.collation_schema,
    col.collation_name,
    col.domain_catalog,
    col.domain_schema,
    col.domain_name,
    col.udt_catalog,
    col.udt_schema,
    col.udt_name,
    col.scope_catalog,
    col.scope_schema,
    col.scope_name,
    col.maximum_cardinality,
    col.dtd_identifier,
    col.is_self_referencing,
    col.is_identity,
    col.identity_generation,
    col.identity_start,
    col.identity_increment,
    col.identity_maximum,
    col.identity_minimum,
    col.identity_cycle,
    col.is_generated,
    col.generation_expression,
    col.is_updatable
   FROM (information_schema.columns col
     LEFT JOIN pg_type typ ON (((col.udt_name)::name = typ.typname)))
  WHERE (((col.table_schema)::name = 'public'::name) AND (NOT ((col.table_name)::name ~~ ('\_%'::name)::text)) AND (NOT ((col.table_name)::name ~~ 'pg\_%'::text)))
  ORDER BY col.table_name, col.ordinal_position
  WITH NO DATA;


ALTER TABLE base."column" OWNER TO postgres;

--
-- Name: ddl_command; Type: TABLE; Schema: base; Owner: postgres
--

CREATE TABLE base.ddl_command (
    id bigint NOT NULL,
    command_tag text,
    schema_name text,
    object_type text,
    object_identity text,
    at timestamp with time zone DEFAULT now()
);


ALTER TABLE base.ddl_command OWNER TO postgres;

--
-- Name: ddl_command_id_seq; Type: SEQUENCE; Schema: base; Owner: postgres
--

CREATE SEQUENCE base.ddl_command_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE base.ddl_command_id_seq OWNER TO postgres;

--
-- Name: ddl_command_id_seq; Type: SEQUENCE OWNED BY; Schema: base; Owner: postgres
--

ALTER SEQUENCE base.ddl_command_id_seq OWNED BY base.ddl_command.id;


--
-- Name: foreign_key; Type: MATERIALIZED VIEW; Schema: base; Owner: postgres
--

CREATE MATERIALIZED VIEW base.foreign_key AS
 SELECT tc.table_schema,
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_schema AS foreign_table_schema,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
   FROM ((information_schema.table_constraints tc
     JOIN information_schema.key_column_usage kcu ON ((((tc.constraint_name)::name = (kcu.constraint_name)::name) AND ((tc.table_schema)::name = (kcu.table_schema)::name))))
     JOIN information_schema.constraint_column_usage ccu ON ((((ccu.constraint_name)::name = (tc.constraint_name)::name) AND ((ccu.table_schema)::name = (tc.table_schema)::name))))
  WHERE ((tc.constraint_type)::text = 'FOREIGN KEY'::text)
  WITH NO DATA;


ALTER TABLE base.foreign_key OWNER TO postgres;

--
-- Name: primary_key; Type: MATERIALIZED VIEW; Schema: base; Owner: postgres
--

CREATE MATERIALIZED VIEW base.primary_key AS
 SELECT kcu.table_schema,
    kcu.table_name,
    tco.constraint_name,
    kcu.ordinal_position,
    kcu.column_name
   FROM (information_schema.table_constraints tco
     JOIN information_schema.key_column_usage kcu ON ((((kcu.constraint_name)::name = (tco.constraint_name)::name) AND ((kcu.constraint_schema)::name = (tco.constraint_schema)::name) AND ((kcu.constraint_name)::name = (tco.constraint_name)::name))))
  WHERE ((tco.constraint_type)::text = 'PRIMARY KEY'::text)
  ORDER BY kcu.table_schema, kcu.table_name, kcu.ordinal_position
  WITH NO DATA;


ALTER TABLE base.primary_key OWNER TO postgres;

--
-- Name: view; Type: MATERIALIZED VIEW; Schema: base; Owner: postgres
--

CREATE MATERIALIZED VIEW base.view AS
 SELECT u.view_schema AS schema_name,
    u.view_name,
    u.table_schema AS referenced_table_schema,
    u.table_name AS referenced_table_name,
    v.view_definition
   FROM (information_schema.view_table_usage u
     JOIN information_schema.views v ON ((((u.view_schema)::name = (v.table_schema)::name) AND ((u.view_name)::name = (v.table_name)::name))))
  WHERE ((u.table_schema)::name <> ALL (ARRAY['information_schema'::name, 'pg_catalog'::name]))
  ORDER BY u.view_schema, u.view_name
  WITH NO DATA;


ALTER TABLE base.view OWNER TO postgres;

--
-- Name: ddl_command id; Type: DEFAULT; Schema: base; Owner: postgres
--

ALTER TABLE ONLY base.ddl_command ALTER COLUMN id SET DEFAULT nextval('base.ddl_command_id_seq'::regclass);


--
-- Name: ddl_command ddl_command_pkey; Type: CONSTRAINT; Schema: base; Owner: postgres
--

ALTER TABLE ONLY base.ddl_command
    ADD CONSTRAINT ddl_command_pkey PRIMARY KEY (id);


