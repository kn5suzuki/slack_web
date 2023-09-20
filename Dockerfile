FROM python:3.12-rc-alpine

WORKDIR /app
COPY . /app/
RUN pip install -r requirements.txt
CMD ["uvicorn", "app.main:app", "--port", "8000"]