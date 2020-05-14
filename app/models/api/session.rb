class Api::Session < ApplicationRecord
  has_many :attendees, dependent: :destroy
end
