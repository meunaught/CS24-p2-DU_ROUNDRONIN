# 
FROM python:3.12-slim

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt
COPY ./alembic.ini /code/alembic.ini

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./app /code/app
COPY ./migration /code/migration
COPY ./docker/entrypoint.sh /code/entrypoint.sh

#
RUN chmod +x /code/entrypoint.sh
ENTRYPOINT [ "/code/entrypoint.sh" ]

