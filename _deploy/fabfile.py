import os.path as path
from fabric.api import env, cd, require, run, sudo, local, lcd


env.use_ssh_config = True
env.shell = '/bin/bash -l -c'
env.colorize_errors = True

# environments

def live():
    env.hosts = ['track.sipuni.com']
    env.remote_app_dir = '/opt/calltracking-landing'

# tasks

def deploy():
    with cd(env.remote_app_dir):
        run('git pull')

def push():
    with lcd('..'):
        local('git push')