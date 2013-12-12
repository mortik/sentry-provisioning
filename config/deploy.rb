require 'mina/git'

case ENV['on']
when 'live'
  set :domain, 'sentry.mortik.de'
  set :user, 'sentry'
  set :deploy_to, '/home/sentry'

  set :application, 'sentry'
else
  set :domain, '10.0.0.11'
  set :user, 'sentry'
  set :deploy_to, '/home/sentry'

  set :application, 'sentry'
end

task :down do
  queue "sudo supervisorctl stop #{application}:*"
end

task :up do
  queue "sudo supervisorctl start #{application}:*"
end

task :restart do
  queue "sudo supervisorctl restart #{application}:*"
end

task :status do
  queue %[sudo supervisorctl status | grep #{application}]
end
