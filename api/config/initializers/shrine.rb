# frozen_string_literal: true

require 'shrine'
require 'shrine/storage/file_system'

if Rails.env.production?
  # setup prod service for shrine
else
  Shrine.storages = {
    cache: Shrine::Storage::FileSystem.new('public', prefix: 'uploads/cache'),
    store: Shrine::Storage::FileSystem.new('public', prefix: 'uploads')
  }
end

Shrine.plugin :activerecord
Shrine.plugin :cached_attachment_data
Shrine.plugin :restore_cached_data
