server {
  listen 80;
  server_name  www.{{ domain }};
  rewrite ^/(.*) http://{{ domain }}/$1 permanent;
}

server {
  listen 443;
  server_name www.{{ domain }};
  rewrite ^/(.*) https://{{ domain }}/$1 permanent;

  ssl on;

  ssl_prefer_server_ciphers on;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 SSLv3;

  ssl_certificate /etc/nginx/ssl/{{ app }}.crt;
  ssl_certificate_key /etc/nginx/ssl/{{ app }}.key;

  ssl_session_cache  shared:SSL:10m;
  ssl_session_timeout  10m;
}

server {
  listen 443;
  server_name {{ domain }};

  ssl on;

  ssl_prefer_server_ciphers on;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 SSLv3;

  ssl_certificate /etc/nginx/ssl/{{ app }}.crt;
  ssl_certificate_key /etc/nginx/ssl/{{ app }}.key;

  ssl_session_cache  shared:SSL:10m;
  ssl_session_timeout  10m;

  access_log  /var/log/nginx/{{ app }}_access.log;
  error_log  /var/log/nginx/{{ app }}_error.log;

  location / {
    root /home/{{ user }};

    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_redirect off;
    if (!-f $request_filename) {
      proxy_pass http://127.0.0.1:{{ port }};
      break;
    }
  }
}
