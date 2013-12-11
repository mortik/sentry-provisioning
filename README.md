# Reckoning

## Provisioning on VM
ansible-playbook provisioning/provision.yml -i provisioning/local -u root

## Provisioning on Stage
ansible-playbook provisioning/provision.yml -i provisioning/stage -u root

## Provisioning on Live
ansible-playbook provisioning/provision.yml -i provisioning/live -u root
