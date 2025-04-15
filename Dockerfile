FROM python:3.9-slim

WORKDIR /app

# System packages for Flask, pandas, etc. (add others if needed)
RUN apt-get update && apt-get install -y libgl1 && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
