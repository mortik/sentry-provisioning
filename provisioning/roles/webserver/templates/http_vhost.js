server {
  listen 80;
  server_name  www.{{ domain }};
  rewrite ^/(.*) http://{{ domain }}/$1 permanent;
}

server {
  listen 80;
  server_name {{ domain }};

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
