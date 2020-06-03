# frozen_string_literal: true

class Attendee < ApplicationRecord
  belongs_to :session
end
