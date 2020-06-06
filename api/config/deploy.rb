# config valid for current version and patch releases of Capistrano
lock "~> 3.14.0"

set :application, "whiskeynight"
set :repo_url, "https://github.com/scottdkey/whiskey-night"


# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/deploy/#{fetch :application}"


append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system', 'public/uploads'
# Only keep the last 5 releases to save disk space
set :keep_releases, 5

