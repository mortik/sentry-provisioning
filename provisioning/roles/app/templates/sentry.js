from sentry.conf.server import *

import os.path

CONF_ROOT = os.path.dirname(__file__)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',

        'NAME': '{{ db }}',
        'USER': '{{ db_user }}',
        'PASSWORD': '{{ db_password }}',
        'HOST': '',
        'PORT': '',

        'OPTIONS': {
            'autocommit': True,
        }
    }
}


# If you're expecting any kind of real traffic on Sentry, we highly recommend
# configuring the CACHES and Redis settings

###########
## CACHE ##
###########

# You'll need to install the required dependencies for Memcached:
#   pip install python-memcached
#
# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
#         'LOCATION': ['127.0.0.1:11211'],
#     }
# }

###########
## Queue ##
###########

# See http://sentry.readthedocs.org/en/latest/queue/index.html for more
# information on configuring your queue broker and workers. Sentry relies
# on a Python framework called Celery to manage queues.

# You can enable queueing of jobs by turning off the always eager setting:
# CELERY_ALWAYS_EAGER = False
# BROKER_URL = 'redis://localhost:6379'

####################
## Update Buffers ##
####################

# Buffers (combined with queueing) act as an intermediate layer between the
# database and the storage API. They will greatly improve efficiency on large
# numbers of the same events being sent to the API in a short amount of time.
# (read: if you send any kind of real data to Sentry, you should enable buffers)

# You'll need to install the required dependencies for Redis buffers:
#   pip install redis hiredis nydus
#
# SENTRY_BUFFER = 'sentry.buffer.redis.RedisBuffer'
# SENTRY_REDIS_OPTIONS = {
#     'hosts': {
#         0: {
#             'host': '127.0.0.1',
#             'port': 6379,
#         }
#     }
# }

################
## Web Server ##
################

# You MUST configure the absolute URI root for Sentry:
SENTRY_URL_PREFIX = 'http://{{ domain }}'  # No trailing slash!

# If you're using a reverse proxy, you should enable the X-Forwarded-Proto
# and X-Forwarded-Host headers, and uncomment the following settings
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
USE_X_FORWARDED_HOST = True

SENTRY_WEB_HOST = '0.0.0.0'
SENTRY_WEB_PORT = {{ port }}
SENTRY_WEB_OPTIONS = {
    'workers': 3,  # the number of gunicorn workers
    'limit_request_line': 0,  # required for raven-js
    'secure_scheme_headers': {'X-FORWARDED-PROTO': 'https'},
}

#################
## Mail Server ##
#################

# For more information check Django's documentation:
#  https://docs.djangoproject.com/en/1.3/topics/email/?from=olddocs#e-mail-backends

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = '{{ smtp_host }}'
EMAIL_HOST_PASSWORD = '{{ smtp_password }}'
EMAIL_HOST_USER = '{{ smtp_user }}'
EMAIL_PORT = {{ smtp_port }}
EMAIL_USE_TLS = True

# The email address to send on behalf of
SERVER_EMAIL = '{{ mail_default_from }}'

###########
## etc. ##
###########

# If this file ever becomes compromised, it's important to regenerate your SECRET_KEY
# Changing this value will result in all current sessions being invalidated
SECRET_KEY = '{{ secret }}'

SENTRY_ALLOW_REGISTRATION = False
SOCIAL_AUTH_CREATE_USERS = False

# http://twitter.com/apps/new
# It's important that input a callback URL, even if its useless. We have no idea why, consult Twitter.
TWITTER_CONSUMER_KEY = '{{ twitter_key }}'
TWITTER_CONSUMER_SECRET = '{{ twitter_secret }}'

# http://developers.facebook.com/setup/
FACEBOOK_APP_ID = '{{ facebook_id }}'
FACEBOOK_API_SECRET = '{{ facebook_secret }}'

# http://code.google.com/apis/accounts/docs/OAuth2.html#Registering
GOOGLE_OAUTH2_CLIENT_ID = '{{ google_id }}'
GOOGLE_OAUTH2_CLIENT_SECRET = '{{ google_secret }}'

# https://github.com/settings/applications/new
GITHUB_APP_ID = '{{ github_id }}'
GITHUB_API_SECRET = '{{ github_secret }}'
GITHUB_EXTENDED_PERMISSIONS = ['repo']

# https://trello.com/1/appKey/generate
TRELLO_API_KEY = '{{ trello_key }}'
TRELLO_API_SECRET = '{{ trello_secret }}'

# https://confluence.atlassian.com/display/BITBUCKET/OAuth+Consumers
BITBUCKET_CONSUMER_KEY = '{{ bitbucket_key }}'
BITBUCKET_CONSUMER_SECRET = '{{ bitbucket_secret }}'

INSTALLED_APPS = INSTALLED_APPS + (
    'django_bcrypt',
)
