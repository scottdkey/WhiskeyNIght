# frozen_string_literal: true

class Api::AttendeesController < ApplicationController
  before_action :set_session
  before_action :set_attendee, only: %i[show update destroy]

  def index
    render json: @session.attendees.all
  end

  def show
    render json: @attendee
  end

  def create
    attendee = @session.attendees.new(attendee_params)

    if attendee.save
      render json: attendee
    else
      render json: attendee.errors, status: 422
    end
  end

  def update
    if @attendee.update(attendee_params)
      render json: @attendee
    else
      render json: attendee.errors, status: 423
    end
  end

  def destroy
    @attendee.destroy
  end

  private

  def attendee_params
    params.require(:attendee).permit(:name, :going)
  end

  def set_attendee
    @attendee = @session.attendee.find(params[:id])
  end

  def set_session
    @session = Session.find(params[:session_id])
  end
end
