class Provision < Thor
  include Thor::Actions

  desc "start", "Run Provisioning"
  def start(on = 'stage')
    run "ansible-playbook provisioning/provision.yml -i provisioning/#{on} -u root"
  end
end
