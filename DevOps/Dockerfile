FROM python:3.12

WORKDIR /Back-end

COPY ${PWD}/requirements.txt /Back-end/

RUN pip install -r requirements.txt

COPY . .

ENV POSTGRES_DB=mydatabase
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_HOST=postgres
ENV POSTGRES_PORT=5432

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]