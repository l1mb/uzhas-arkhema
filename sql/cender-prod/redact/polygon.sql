CREATE TABLE CLIENT_INFO 
(
  ID NUMBER,
  F_NAME VARCHAR2(64), /* фамилия*/
  NAME VARCHAR2(64),  /* имя */
  S_NAME VARCHAR2(64), /* отчество */ 
  BIRTHDAY DATE, /* дата рождения */
  PHONE VARCHAR2(32), /* телефон */
  EMAIL VARCHAR2(64), /* email */
  CCARD VARCHAR2(32), /* номер кредитной карты */
  CONSTRAINT "CLIENT_INFO_PK" PRIMARY KEY ("ID")
);

insert into CLIENT_INFO 
    values(1,
     'Иванов',
      'Иван',
       'Иванович',
        to_date('15-05-1986', 'DD-MM-YYYY'),
        '79763334589',
         'ivan@dom2.ru',
          '5767881897856776'
          );

select f_name, name, birthday, email, phone, ccard from cender.client_info;
