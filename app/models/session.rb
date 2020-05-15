class Session < ApplicationRecord
  has_many :attendees, dependent: :destroy
  has_many :items, dependent: :destroy
end
