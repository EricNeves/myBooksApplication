FROM php:8.1-apache

RUN apt-get update && apt-get install -y git unzip libpq-dev

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install pdo pdo_pgsql

RUN a2enmod rewrite

COPY . /var/www/html

EXPOSE 80