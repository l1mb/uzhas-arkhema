create pluggable database prod
    admin user adm identified by 11
    roles = (dba)
    default tablespace cender_ts
    datafile '/u02/app/oracle/oradata/prod/datafile.dbf' size 700m autoextend on
    path_prefix='/u02/app/oracle/oradata/prod/'
    file_name_convert = (
        '/u02/app/oracle/oradata/ORCL/pdbseed/',
        '/u02/app/oracle/oradata/ORCL/prod/'
    );

alter pluggable database prod open;
alter pluggable database prod save state
