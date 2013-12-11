server {
  listen 80;
  server_name  www.{{ domain }};
  rewrite ^/(.*) http://{{ domain }}/$1 permanent;
}

server {
  listen 80;
  server_name {{ domain }};

  add_header Strict-Transport-Security "max-age=31536000; includeSubdomains";

  access_log  /var/log/nginx/{{ app }}_access.log;
  error_log  /var/log/nginx/{{ app }}_error.log;

  location / {
    root /home/{{ user }}/current/public;

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
