FROM postgres:13.2-alpine

ENV POSTGRES_USER=deandraper
ENV POSTGRES_PASSWORD
ENV POSTGRES_DB=spacework

COPY *.sql /docker-entrypoint-initdb.d/

