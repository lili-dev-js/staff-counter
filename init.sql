CREATE USER admin1 WITH PASSWORD 'Zupka765';
CREATE DATABASE "staff-counter" OWNER admin1;
\connect staff-counter;
GRANT ALL PRIVILEGES ON DATABASE "staff-counter" TO admin1;
ALTER USER admin1 CREATEDB;

GRANT ALL ON SCHEMA public TO admin1;
ALTER SCHEMA public OWNER TO admin1;