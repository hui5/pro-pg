create event trigger refresh_meta_for_ddl
    on ddl_command_end
execute procedure base.refresh_meta_trigger();


grant usage                     on schema base to postgres, anon, authenticated, service_role;
grant all privileges on all tables  in schema base to postgres, anon, authenticated, service_role;
grant all privileges on all functions  in schema base to postgres, anon, authenticated, service_role;
grant all privileges on all sequences  in schema base to postgres, anon, authenticated, service_role;


alter default privileges in schema base grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema base grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema base grant all on sequences to postgres, anon, authenticated, service_role;

