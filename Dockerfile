FROM python:3.12-rc-alpine

WORKDIR /app
COPY backend/ /app/
RUN pip3 install -r requirements.txt
CMD ["uvicorn", "app.main:app", "--port", "8000"]