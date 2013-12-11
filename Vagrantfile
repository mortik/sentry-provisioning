# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.package.name = "Sentry VM"
  config.vm.box = "ubuntu64-12.04"

  config.vm.box_url = "http://cloud-images.ubuntu.com/precise/current/precise-server-cloudimg-vagrant-amd64-disk1.box"

  config.vm.network :forwarded_port, guest: 5000, host: 5000

  config.vm.hostname = "sentry.local"

  config.vm.network :private_network, ip: "10.0.0.11"

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "4096"]
    vb.customize ["modifyvm", :id, "--cpus", 4]
  end

  config.vm.provision :ansible do |ansible|
    ansible.playbook = "provisioning/provision.yml"
    ansible.inventory_path = "provisioning/vagrant"
  end
end
