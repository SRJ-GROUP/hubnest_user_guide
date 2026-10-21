# Multi-stage production build for HubNest User Guide
# Stage 1: Build static site with MkDocs Material
FROM python:3.11-alpine AS builder

WORKDIR /build

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy documentation sources and configuration
COPY mkdocs.yml .
COPY overrides/ ./overrides/
COPY docs/ ./docs/

# Build static HTML site with strict verification
RUN python -m mkdocs build --clean --strict

# Stage 2: High-performance lightweight Nginx web server
FROM nginx:1.27-alpine

# Clean default webroot and config
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static documentation from builder stage
COPY --from=builder /build/site /usr/share/nginx/html

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
