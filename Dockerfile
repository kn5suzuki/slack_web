FROM python:3.12-rc-alpine

WORKDIR /app
COPY backend/ /app/
RUN pip3 install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]