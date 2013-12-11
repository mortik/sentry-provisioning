[program:app-1]
directory=/home/{{ user }}/
command=sentry --config=/home/{{ user }}/.sentry/sentry.conf.py start http
autostart=true
autorestart=true
redirect_stderr=true
stopsignal=QUIT
stdout_logfile=/home/{{ user }}/app-1.log
stderr_logfile=/home/{{ user }}/app-1.error.log
user={{ user }}

[group:{{ app }}]
programs=app-1
