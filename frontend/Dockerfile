FROM node:24-alpine AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM httpd:alpine3.23

# Enable rewrite module
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf

RUN sed -i 's/#LoadModule deflate_module/LoadModule deflate_module/' /usr/local/apache2/conf/httpd.conf

# Allow .htaccess overrides
COPY apache.conf /usr/local/apache2/conf/extra/apache.conf
RUN echo "Include conf/extra/apache.conf" >> /usr/local/apache2/conf/httpd.conf

# Clean default files
RUN rm -rf /usr/local/apache2/htdocs/*

# Copy Angular build
COPY --from=frontend /app/dist/browser-arcade/browser/ /usr/local/apache2/htdocs/

# Copy .htaccess
COPY .htaccess /usr/local/apache2/htdocs/

EXPOSE 80