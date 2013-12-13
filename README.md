# Sentry Provisioning

## Setup

Update or create a Host vars file under ```provisioning/host_vars``` look in the example.io file for a list of needed vars.

create a host file in the provisioning folder like ```provisioning/example```

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


After ansible is finished you still need to login to sentry@*your-host* and run:

```
sentry --config=/home/sentry/.sentry/sentry.conf.py createsuperuser
```
