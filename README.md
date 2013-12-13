# Sentry Provisioning

## Setup

Update or create a Host vars file under ```provisioning/host_vars``` look in the 10.0.0.11 file for a list of needed vars.

Also make sure to change the superuser credentials!

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
