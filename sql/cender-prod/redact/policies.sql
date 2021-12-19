exec DBMS_REDACT.DROP_POLICY('cender','CLIENT_INFO', 'redact_client_info');


BEGIN
dbms_redact.add_policy(
     object_schema        => 'cender',
     object_name          => 'CLIENT_INFO',
     column_name          => 'BIRTHDAY',
     policy_name          => 'redact_client_info',
     function_type        => DBMS_REDACT.PARTIAL, /* Частичное маскирование */
     function_parameters  => 'Md01Y', /* Маска изменений */
     expression           => 'SYS_CONTEXT(''SYS_SESSION_ROLES'',''RL_CENDER'') = ''FALSE''' /* Условие - замена при отсутствии роли RL_CENDER */
);
END;
/

BEGIN
DBMS_REDACT.ALTER_POLICY(
     object_schema         => 'cender',
     object_name           => 'CLIENT_INFO',
     column_name           => 'PHONE',
     policy_name           => 'redact_client_info',
     function_type         => DBMS_REDACT.REGEXP, /* Маскирование с помощью регулярного выражения */
     regexp_pattern	   => '\d+(\d{5})$', 
     regexp_replace_string => '******\1',
     regexp_position       => DBMS_REDACT.RE_BEGINNING,
     regexp_occurrence     => DBMS_REDACT.RE_ALL,
     expression            => 'SYS_CONTEXT(''SYS_SESSION_ROLES'',''RL_CENDER'') = ''FALSE''',
     action                => DBMS_REDACT.ADD_COLUMN
);
END;
/

BEGIN
DBMS_REDACT.ALTER_POLICY(
     object_schema         => 'cender',
     object_name           => 'CLIENT_INFO',
     column_name           => 'EMAIL',
     policy_name           => 'redact_client_info',
     function_type         => DBMS_REDACT.REGEXP,
     regexp_pattern	   => DBMS_REDACT.RE_PATTERN_EMAIL_ADDRESS, /* Используем готовое */
     regexp_replace_string => DBMS_REDACT.RE_REDACT_EMAIL_DOMAIN, /* Используем готовое */
     expression            => 'SYS_CONTEXT(''SYS_SESSION_ROLES'',''RL_CENDER'') = ''FALSE''',
     action                => DBMS_REDACT.ADD_COLUMN
);
END;
/

BEGIN
DBMS_REDACT.ALTER_POLICY(
     object_schema         => 'cender',
     object_name           => 'CLIENT_INFO',
     column_name           => 'CCARD',
     policy_name           => 'redact_client_info',
     function_type         => DBMS_REDACT.REGEXP,
     regexp_pattern	   => DBMS_REDACT.RE_PATTERN_CC_L6_T4,
     regexp_replace_string => DBMS_REDACT.RE_REDACT_CC_MIDDLE_DIGITS,
     expression            => 'SYS_CONTEXT(''SYS_SESSION_ROLES'',''RL_CENDER'') = ''FALSE''',
     action                => DBMS_REDACT.ADD_COLUMN
);
END;
/
