class Provision < Thor
  include Thor::Actions

  desc "start", "Run Provisioning"
  def start(on = 'vagrant')
    run "ansible-playbook provisioning/provision.yml -i provisioning/#{on} -u root"
  end
end
