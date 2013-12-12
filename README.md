# Sentry Provisioning

## Setup

```
bundle install
``` 

### Provisioning on Vagrant VM
```
ansible-playbook provisioning/provision.yml -i provisioning/vagrant -u root
```

or via thor task

```
bundle exec thor provision:start
``` 

### Provisioning on Live
```
ansible-playbook provisioning/provision.yml -i provisioning/live -u root
```

or via thor task


```
bundle exec thor provision:start live
``` 
