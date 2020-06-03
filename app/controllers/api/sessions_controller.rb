# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  before_action :set_session, only: %i[show update destroy]
  def index
    render json: Session.all
  end

  def create
    session = Session.new(session_params)

    if session.save
      render json: session
    else
      render json: session.error, status: 422
    end
  end

  def update
    if @session.update(session_params)
      render json: @session
    else
      render json: session.error, status: 423
    end
  end

  def destroy
    @session.destroy
  end

  private

  def session_params
    params.require(:session).permit(:date, :host, :location)
  end

  def set_session
    @session = Session.find(params[:id])
  end
end
