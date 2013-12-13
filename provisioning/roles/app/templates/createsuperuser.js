#!/usr/bin/env python

from __future__ import absolute_import
from __future__ import print_function
from __future__ import unicode_literals

import pexpect
import re
import sys

child = pexpect.spawn('/usr/bin/env', ['sentry', '--config=/home/{{ user }}/.sentry/sentry.conf.py', 'createsuperuser', '--username={{ superuser }}', '--email={{ superuser_email }}'])
if (child.isalive()):
  child.logfile = sys.stdout
  child.expect('Password:.*')
  child.send('{{ superuser_password }}\r')
  child.expect('Password .*')
  child.sendline('{{ superuser_password }}\r')
  child.kill(1)
else:
  print('error calling sentry')