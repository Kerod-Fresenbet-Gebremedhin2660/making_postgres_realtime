\c doc_database

create table users(
  id bigserial primary key,
  email text not null  unique
);

create table doc (
                     id bigserial primary key,
                     data text,
                     created_at timestamp default now()
);




create or replace function data_capture_insert_trigger_function ()
    returns trigger as $$
declare
begin
    if (tg_op = 'INSERT') THEN
        raise notice 'doc_insert_channel';
        perform pg_notify('doc_insert_channel', row_to_json(new)::text);
        return new;
    elsif (tg_op = 'UPDATE') THEN
        raise notice 'doc_update_channel';
        perform pg_notify('doc_update_channel', row_to_json(new)::text);
        return new;
    elsif (tg_op = 'DELETE') THEN
        raise notice 'doc_delete_channel';
        perform pg_notify('doc_delete_channel', row_to_json(new)::text);
        return new;
    elsif (tg_op = 'TRUNCATE') THEN
        raise notice 'doc_truncate_channel';
        perform pg_notify('doc_truncate_channel', row_to_json(new)::text);
        return new;
    end if;
end;
$$ language plpgsql;

drop trigger if exists data_capture_insert_trigger on doc;

create trigger data_capture_insert_trigger
    after insert or delete or update on doc for each row
execute procedure data_capture_insert_trigger_function();