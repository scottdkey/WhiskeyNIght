# frozen_string_literal: true

class Api::PeopleController < ApplicationController
  before_action :set_session, only: %i[show update destroy]

  def index
    render json: @session.people.all
  end

  def show
    render json: @person
  end

  def create
    person = @session.people.new(people_params)

    if person.save
      render json: person
    else
      render json: person.errors, status: 422
    end
  end

  def update
    if @person.update(people_params)
      render json: @person
    else
      render json: person.errors, status: 423
    end
  end

  def destroy
    @person.destroy
  end

  private

  def people_params
    params.require(:people).permit(:name, :going)
  end

  def set_person
    @person = @session.people.find(params[:id])
  end

  def set_session
    @session = Session.find(params[:sesson_id])
  end
end
