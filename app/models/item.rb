# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :session
  has_many :ingredients, dependent: :destroy
end
